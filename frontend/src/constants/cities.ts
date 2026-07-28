export const CITIES = [
  // Major Cities, Hubs & Tourist Destinations
  'Noida', 'Greater Noida', 'Gurgaon (Gurugram)', 'Faridabad', 'Ghaziabad', 'Navi Mumbai', 'Thane', 'Kalyan', 'Vasai', 'Howrah',
  'Siliguri', 'Darjeeling', 'Manali', 'Shimla', 'Dharamsala', 'Rishikesh', 'Haridwar', 'Mussoorie', 'Nainital', 'Ooty', 'Munnar', 'Kodaikanal',
  'Mount Abu', 'Pushkar', 'Vrindavan', 'Ayodhya', 'Bodhgaya', 'Tirupati', 'Shirdi', 'Kanyakumari', 'Rameshwaram',
  
  // Major Bus Terminals
  'Kashmere Gate ISBT (Delhi)', 'Anand Vihar ISBT (Delhi)', 'Sarai Kale Khan (Delhi)', 'Esplanade (Kolkata)', 'CMBT (Chennai)',
  'Kempegowda Bus Station/Majestic (Bangalore)', 'Pune Bus Stand', 'Mumbai Central Bus Depot', 'Dadar (Mumbai)',

  // Andhra Pradesh
  'Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Prakasam', 'Srikakulam', 'Sri Potti Sriramulu Nellore', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR District, Kadapa (Cuddapah)',
  // Arunachal Pradesh
  'Anjaw', 'Changlang', 'Dibang Valley', 'East Kameng', 'East Siang', 'Kra Daadi', 'Kurung Kumey', 'Lohit', 'Longding', 'Lower Dibang Valley', 'Lower Subansiri', 'Namsai', 'Papum Pare', 'Siang', 'Tawang', 'Tirap', 'Upper Siang', 'Upper Subansiri', 'West Kameng', 'West Siang', 'Itanagar',
  // Assam
  'Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Dima Hasao (North Cachar Hills)', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong',
  // Bihar
  'Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran (Motihari)', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur (Bhabua)', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger (Monghyr)', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia (Purnea)', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran',
  // Chhattisgarh
  'Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada (South Bastar)', 'Dhamtari', 'Durg', 'Gariyaband', 'Janjgir-Champa', 'Jashpur', 'Kabirdham (Kawardha)', 'Kanker (North Bastar)', 'Kondagaon', 'Korba', 'Korea (Koriya)', 'Mahasamund', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sukma', 'Surajpur', 'Surguja',
  // Goa
  'North Goa', 'South Goa',
  // Gujarat
  'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha (Palanpur)', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udepur', 'Dahod', 'Dangs (Ahwa)', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kachchh', 'Kheda (Nadiad)', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada (Rajpipla)', 'Navsari', 'Panchmahal (Godhra)', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha (Himmatnagar)', 'Surat', 'Surendranagar', 'Tapi (Vyara)', 'Vadodara', 'Valsad',
  // Haryana
  'Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurgaon', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Mewat', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar',
  // Himachal Pradesh
  'Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul & Spiti', 'Mandi', 'Shimla', 'Sirmaur (Sirmour)', 'Solan', 'Una',
  // Jammu & Kashmir
  'Anantnag', 'Bandipore', 'Baramulla', 'Budgam', 'Doda', 'Ganderbal', 'Jammu', 'Kargil', 'Kathua', 'Kishtwar', 'Kulgam', 'Kupwara', 'Poonch', 'Pulwama', 'Rajouri', 'Ramban', 'Reasi', 'Samba', 'Shopian', 'Srinagar', 'Udhampur',
  // Jharkhand
  'Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribag', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahibganj', 'Seraikela-Kharsawan', 'Simdega', 'West Singhbhum',
  // Karnataka
  'Bagalkot', 'Ballari (Bellary)', 'Belagavi (Belgaum)', 'Bengaluru (Bangalore) Rural', 'Bengaluru (Bangalore) Urban', 'Bidar', 'Chamarajanagar', 'Chikballapur', 'Chikkamagaluru (Chikmagalur)', 'Chitradurga', 'Dakshina Kannada', 'Davangere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi (Gulbarga)', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru (Mysore)', 'Raichur', 'Ramanagara', 'Shivamogga (Shimoga)', 'Tumakuru (Tumkur)', 'Udupi', 'Uttara Kannada (Karwar)', 'Vijayapura (Bijapur)', 'Yadgir',
  // Kerala
  'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad',
  // Madhya Pradesh
  'Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha',
  // Maharashtra
  'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal',
  // Manipur
  'Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul',
  // Meghalaya
  'East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills',
  // Mizoram
  'Aizawl', 'Champhai', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha', 'Serchhip',
  // Nagaland
  'Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Peren', 'Phek', 'Tuensang', 'Wokha', 'Zunheboto',
  // Odisha
  'Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghapur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar (Keonjhar)', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Sonepur', 'Sundargarh',
  // Punjab
  'Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Muktsar', 'Nawanshahr (Shahid Bhagat Singh Nagar)', 'Pathankot', 'Patiala', 'Rupnagar', 'Sahibzada Ajit Singh Nagar (Mohali)', 'Sangrur', 'Tarn Taran',
  // Rajasthan
  'Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur',
  // Sikkim
  'East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim',
  // Tamil Nadu
  'Ariyalur', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Salem', 'Sivaganga', 'Thanjavur', 'Theni', 'Thoothukudi (Tuticorin)', 'Tiruchirappalli', 'Tirunelveli', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar',
  // Telangana
  'Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon', 'Jayashankar Bhoopalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 'Komaram Bheem Asifabad', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 'Medchal', 'Nagarkurnool', 'Nalgonda', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal (Rural)', 'Warangal (Urban)', 'Yadadri Bhuvanagiri',
  // Tripura
  'Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura',
  // Uttar Pradesh
  'Agra', 'Aligarh', 'Allahabad', 'Ambedkar Nagar', 'Amethi (Chatrapati Sahuji Mahraj Nagar)', 'Amroha (J.P. Nagar)', 'Auraiya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Faizabad', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur (Panchsheel Nagar)', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kanshiram Nagar (Kasganj)', 'Kaushambi', 'Kushinagar (Padrauna)', 'Lakhimpur - Kheri', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'RaeBareli', 'Rampur', 'Saharanpur', 'Sambhal (Bhim Nagar)', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamali (Prabuddh Nagar)', 'Shravasti', 'Siddharth Nagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi',
  // Uttarakhand
  'Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi',
  // West Bengal
  'Alipurduar', 'Bankura', 'Birbhum', 'Burdwan (Bardhaman)', 'Cooch Behar', 'Dakshin Dinajpur (South Dinajpur)', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Medinipur (West Medinipur)', 'Purba Medinipur (East Medinipur)', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur (North Dinajpur)',

  // Add Major World Cities for international travel
  'London', 'New York', 'Paris', 'Tokyo', 'Dubai', 'Singapore', 'Los Angeles', 'Chicago', 'Toronto', 'Sydney', 'Melbourne', 'Frankfurt', 'Amsterdam', 'Hong Kong',
];

export const TRAIN_CITIES = [
  // Major Indian Railway Junctions
  'New Delhi (NDLS)', 'Old Delhi (DLI)', 'Hazrat Nizamuddin (NZM)', 'Anand Vihar Terminal (ANVT)',
  'Mumbai Central (MMCT)', 'Chhatrapati Shivaji Maharaj Terminus (CSMT)', 'Dadar (DR)', 'Lokmanya Tilak Terminus (LTT)', 'Bandra Terminus (BDTS)',
  'Howrah Junction (HWH)', 'Sealdah (SDAH)', 'Kolkata (KOAA)', 'Shalimar (SHM)',
  'Chennai Central (MAS)', 'Chennai Egmore (MS)', 'Tambaram (TBM)',
  'KSR Bengaluru City (SBC)', 'Yesvantpur Junction (YPR)', 'Bengaluru Cantt (BNC)',
  'Secunderabad Junction (SC)', 'Hyderabad Deccan (HYB)', 'Kacheguda (KCG)',
  'Pune Junction (PUNE)', 'Ahmedabad Junction (ADI)', 'Jaipur Junction (JP)',
  'Kanpur Central (CNB)', 'Lucknow NR (LKO)', 'Lucknow NE (LJN)',
  'Patna Junction (PNBE)', 'Bhopal Junction (BPL)', 'Habibganj (HBJ)',
  'Indore Junction (INDB)', 'Nagpur Junction (NGP)', 'Surat (ST)',
  'Vadodara Junction (BRC)', 'Guwahati (GHY)', 'Bhubaneswar (BBS)',
  'Thiruvananthapuram Central (TVC)', 'Ernakulam Junction (ERS)', 'Kozhikode (CLT)',
  'Visakhapatnam (VSKP)', 'Vijayawada (BZA)', 'Tirupati (TPTY)',
  'Madurai Junction (MDU)', 'Coimbatore Junction (CBE)', 'Tiruchirappalli (TPJ)',
  'Chandigarh (CDG)', 'Amritsar Junction (ASR)', 'Ludhiana Junction (LDH)',
  'Varanasi Junction (BSB)', 'Banaras (BSBS)', 'Deen Dayal Upadhyaya (DDU)',
  'Agra Cantt (AGC)', 'Mathura Junction (MTJ)', 'Gwalior (GWL)',
  'Jhansi Junction (VGLJ)', 'Jabalpur (JBP)', 'Raipur Junction (R)',
  'Ranchi (RNC)', 'Tatanagar Junction (TATA)', 'Dhanbad Junction (DHN)',
  'Gorakhpur Junction (GKP)', 'Muzaffarpur Junction (MFP)', 'Gaya Junction (GAYA)',
  'Asansol Junction (ASN)', 'Siliguri Junction (SGUJ)', 'New Jalpaiguri (NJP)',
  'Jammu Tawi (JAT)', 'Shri Mata Vaishno Devi Katra (SVDK)', 'Haridwar (HW)', 'Dehradun (DDN)',
];

export const AIRPORT_CITIES = [
  // Major Indian Airports
  'Delhi (DEL) - Indira Gandhi International Airport',
  'Mumbai (BOM) - Chhatrapati Shivaji Maharaj International Airport',
  'Bengaluru (BLR) - Kempegowda International Airport',
  'Hyderabad (HYD) - Rajiv Gandhi International Airport',
  'Chennai (MAA) - Chennai International Airport',
  'Kolkata (CCU) - Netaji Subhas Chandra Bose International Airport',
  'Ahmedabad (AMD) - Sardar Vallabhbhai Patel International Airport',
  'Pune (PNQ) - Pune Airport',
  'Goa (GOI) - Dabolim Airport',
  'Goa (GOX) - Manohar International Airport (Mopa)',
  'Kochi (COK) - Cochin International Airport',
  'Thiruvananthapuram (TRV) - Trivandrum International Airport',
  'Kozhikode (CCJ) - Calicut International Airport',
  'Kannur (CNN) - Kannur International Airport',
  'Lucknow (LKO) - Chaudhary Charan Singh International Airport',
  'Jaipur (JAI) - Jaipur International Airport',
  'Guwahati (GAU) - Lokpriya Gopinath Bordoloi International Airport',
  'Amritsar (ATQ) - Sri Guru Ram Dass Jee International Airport',
  'Srinagar (SXR) - Sheikh ul-Alam International Airport',
  'Chandigarh (IXC) - Shaheed Bhagat Singh International Airport',
  'Varanasi (VNS) - Lal Bahadur Shastri International Airport',
  'Nagpur (NAG) - Dr. Babasaheb Ambedkar International Airport',
  'Bhubaneswar (BBI) - Biju Patnaik International Airport',
  'Patna (PAT) - Jay Prakash Narayan Airport',
  'Indore (IDR) - Devi Ahilya Bai Holkar Airport',
  'Surat (STV) - Surat International Airport',
  'Vadodara (BDQ) - Civil Aerodrome',
  'Mangalore (IXE) - Mangaluru International Airport',
  'Coimbatore (CJB) - Coimbatore International Airport',
  'Madurai (IXM) - Madurai Airport',
  'Tiruchirappalli (TRZ) - Tiruchirappalli International Airport',
  'Visakhapatnam (VTZ) - Visakhapatnam Airport',
  'Vijayawada (VGA) - Vijayawada Airport',
  'Tirupati (TIR) - Tirupati Airport',
  'Bagdogra (IXB) - Bagdogra International Airport',
  'Port Blair (IXZ) - Veer Savarkar International Airport',
  'Ranchi (IXR) - Birsa Munda Airport',
  'Raipur (RPR) - Swami Vivekananda Airport',
  'Agartala (IXA) - Maharaja Bir Bikram Airport',
  'Dehradun (DED) - Jolly Grant Airport',
  // Major International Airports
  'London (LHR)', 'New York (JFK)', 'Dubai (DXB)', 'Singapore (SIN)', 'Paris (CDG)',
  'Tokyo (HND)', 'Hong Kong (HKG)', 'Frankfurt (FRA)', 'Amsterdam (AMS)', 'Sydney (SYD)',
];
