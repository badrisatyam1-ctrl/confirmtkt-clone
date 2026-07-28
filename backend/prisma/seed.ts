import { PrismaClient, VehicleType, StopType, SeatClass, Gender } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with multi-modal data...');

  // 1. RBAC (Roles & Permissions)
  const pCreateBooking = await prisma.permission.upsert({
    where: { name: 'CREATE_BOOKING' },
    update: {},
    create: { name: 'CREATE_BOOKING', description: 'Can create bookings' },
  });
  
  const pManageUsers = await prisma.permission.upsert({
    where: { name: 'MANAGE_USERS' },
    update: {},
    create: { name: 'MANAGE_USERS', description: 'Can manage all users' },
  });

  const pManageFleet = await prisma.permission.upsert({
    where: { name: 'MANAGE_FLEET' },
    update: {},
    create: { name: 'MANAGE_FLEET', description: 'Can manage operators and vehicles' },
  });

  const superAdminRole = await prisma.role.upsert({
    where: { name: 'SUPER_ADMIN' },
    update: {},
    create: { name: 'SUPER_ADMIN', description: 'Ultimate power' },
  });

  const customerRole = await prisma.role.upsert({
    where: { name: 'CUSTOMER' },
    update: {},
    create: { name: 'CUSTOMER', description: 'Standard user' },
  });

  await prisma.rolePermission.createMany({
    data: [
      { roleId: superAdminRole.id, permissionId: pCreateBooking.id },
      { roleId: superAdminRole.id, permissionId: pManageUsers.id },
      { roleId: superAdminRole.id, permissionId: pManageFleet.id },
      { roleId: customerRole.id, permissionId: pCreateBooking.id },
    ],
    skipDuplicates: true,
  });

  // 2. Admin User & Customer User
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@travelbooking.com' },
    update: {},
    create: {
      email: 'admin@travelbooking.com',
      firstName: 'Super',
      lastName: 'Admin',
      passwordHash: adminPassword,
      isVerified: true,
      roles: {
        create: { roleId: superAdminRole.id }
      },
      wallet: {
        create: { balance: 0 }
      }
    },
  });

  const customerPassword = await bcrypt.hash('Customer@123', 10);
  const customerUser = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      passwordHash: customerPassword,
      isVerified: true,
      roles: {
        create: { roleId: customerRole.id }
      },
      wallet: {
        create: { balance: 5000 }
      }
    },
  });

  // 3. Operators
  const indigo = await prisma.operator.upsert({
    where: { code: 'IGO' },
    update: {},
    create: { name: 'IndiGo Airlines', code: 'IGO', contactEmail: 'contact@goindigo.in', contactPhone: '+919999999999' },
  });

  const irctc = await prisma.operator.upsert({
    where: { code: 'IRCTC' },
    update: {},
    create: { name: 'Indian Railways', code: 'IRCTC', contactEmail: 'care@irctc.co.in', contactPhone: '139' },
  });

  const redbusExp = await prisma.operator.upsert({
    where: { code: 'RBE' },
    update: {},
    create: { name: 'RedBus Express', code: 'RBE', contactEmail: 'support@redbus.in', contactPhone: '+918888888888' },
  });

  // 4. Vehicles & Seat Layouts
  const flight = await prisma.vehicle.upsert({
    where: { registrationNumber: '6E-123' },
    update: {},
    create: {
      operatorId: indigo.id,
      type: VehicleType.FLIGHT,
      name: 'Airbus A320',
      registrationNumber: '6E-123',
      capacity: 180,
      amenities: ['Meals', 'In-flight Entertainment'],
      seatLayouts: {
        create: {
          name: 'Economy',
          rows: 30,
          columns: 6,
          seats: {
            create: Array.from({ length: 180 }).map((_, i) => {
              const row = Math.floor(i / 6) + 1;
              const col = (i % 6) + 1;
              const colLetter = ['A', 'B', 'C', 'D', 'E', 'F'][col - 1];
              return {
                seatNumber: `${row}${colLetter}`,
                seatClass: SeatClass.ECONOMY,
                row,
                column: col,
                priceOffset: (col === 1 || col === 6) ? 500 : 0 // Window seat premium
              };
            })
          }
        }
      }
    }
  });

  // 5. Stops (Airports)
  const delStop = await prisma.stop.upsert({
    where: { code: 'DEL' },
    update: {},
    create: {
      code: 'DEL',
      name: 'Indira Gandhi International Airport',
      type: StopType.AIRPORT,
      city: 'New Delhi',
      state: 'Delhi',
      latitude: 28.5562,
      longitude: 77.1000,
    },
  });

  const bomStop = await prisma.stop.upsert({
    where: { code: 'BOM' },
    update: {},
    create: {
      code: 'BOM',
      name: 'Chhatrapati Shivaji Maharaj International Airport',
      type: StopType.AIRPORT,
      city: 'Mumbai',
      state: 'Maharashtra',
      latitude: 19.0896,
      longitude: 72.8656,
    },
  });

  // 6. Route
  const delBomRoute = await prisma.route.upsert({
    where: { code: 'DEL-BOM-FLIGHT' },
    update: {},
    create: {
      code: 'DEL-BOM-FLIGHT',
      originCity: 'New Delhi',
      destinationCity: 'Mumbai',
      distance: 1148,
      estimatedDuration: 135, // 2h 15m
      stops: {
        create: [
          { stopId: delStop.id, order: 1, distanceFromOrigin: 0, estimatedTimeFromOrigin: 0 },
          { stopId: bomStop.id, order: 2, distanceFromOrigin: 1148, estimatedTimeFromOrigin: 135 }
        ]
      }
    },
  });

  // 7. Schedule & Trip
  const schedule = await prisma.schedule.create({
    data: {
      routeId: delBomRoute.id,
      vehicleId: flight.id,
      departureTime: '08:00',
      arrivalTime: '10:15',
      recurrence: 'DAILY',
      baseFare: 5500,
    }
  });

  const tripDate = new Date();
  tripDate.setHours(0, 0, 0, 0); // Today

  const departure = new Date(tripDate);
  departure.setHours(8, 0, 0, 0);

  const arrival = new Date(tripDate);
  arrival.setHours(10, 15, 0, 0);

  const trip = await prisma.trip.create({
    data: {
      routeId: delBomRoute.id,
      vehicleId: flight.id,
      date: tripDate,
      actualDeparture: departure,
      actualArrival: arrival,
      baseFare: 5500,
      availableCapacity: 180,
    }
  });

  // 8. Support Ticket & Notification
  const ticket = await prisma.supportTicket.create({
    data: {
      ticketRef: 'TKT-001',
      userId: customerUser.id,
      subject: 'Issue with booking display',
      messages: {
        create: {
          senderId: customerUser.id,
          message: 'I cannot see my upcoming bookings.'
        }
      }
    }
  });

  await prisma.notification.create({
    data: {
      userId: customerUser.id,
      title: 'Welcome to TravelBooking!',
      body: 'Get ready to experience seamless multi-modal travel.',
      type: 'SYSTEM'
    }
  });

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
