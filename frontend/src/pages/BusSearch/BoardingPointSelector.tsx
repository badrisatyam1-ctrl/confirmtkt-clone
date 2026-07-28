import { useState } from 'react';

interface Stop {
  id: string;
  name: string;
  city: string;
  time: string;
}

interface BoardingPointSelectorProps {
  boardingPoints: Stop[];
  droppingPoints: Stop[];
  onPointsSelect: (boardingId: string, droppingId: string) => void;
}

export default function BoardingPointSelector({ boardingPoints, droppingPoints, onPointsSelect }: BoardingPointSelectorProps) {
  const [selectedBoarding, setSelectedBoarding] = useState<string>('');
  const [selectedDropping, setSelectedDropping] = useState<string>('');

  const handleSelect = (type: 'boarding' | 'dropping', id: string) => {
    let board = selectedBoarding;
    let drop = selectedDropping;

    if (type === 'boarding') {
      board = id;
      setSelectedBoarding(id);
    } else {
      drop = id;
      setSelectedDropping(id);
    }

    if (board && drop) {
      onPointsSelect(board, drop);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Boarding Points */}
        <div>
          <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            Boarding Point
          </h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
            {boardingPoints.map(point => (
              <label 
                key={point.id} 
                className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer transition-colors ${selectedBoarding === point.id ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="boarding" 
                    checked={selectedBoarding === point.id}
                    onChange={() => handleSelect('boarding', point.id)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="font-semibold text-sm text-slate-800 dark:text-white">{point.name}</p>
                    <p className="text-xs text-slate-500">{point.city}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-slate-900 dark:text-white">{point.time}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Dropping Points */}
        <div>
          <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            Dropping Point
          </h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
            {droppingPoints.map(point => (
              <label 
                key={point.id} 
                className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer transition-colors ${selectedDropping === point.id ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="dropping" 
                    checked={selectedDropping === point.id}
                    onChange={() => handleSelect('dropping', point.id)}
                    className="w-4 h-4 text-green-500"
                  />
                  <div>
                    <p className="font-semibold text-sm text-slate-800 dark:text-white">{point.name}</p>
                    <p className="text-xs text-slate-500">{point.city}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-slate-900 dark:text-white">{point.time}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
