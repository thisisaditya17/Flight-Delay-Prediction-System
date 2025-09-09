import { useState } from 'react'
import OriginDropdown from './OriginDropdown' 
import DestDropdown from './DestDropdown'
import AirlineDropdown from './AirlineDropdown'
import DateSelector from './DateSelector'
import HourSelector from './HourSelector' 

function App() {
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDest, setSelectedDest] = useState(null);
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState(null);
  const [depHour, setDepHour] = useState(null); 
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOriginChange = (option) => setSelectedOrigin(option);
  const handleDestinationChange = (option) => setSelectedDest(option);
  const handleAirlineChange = (option) => setSelectedAirline(option);

  const handleDateChange = (date) => {
  setSelectedDate(date);
  if (date) {
    const day = date.getDay();
    setDayOfWeek(day);
  } else {
    setDayOfWeek(null);
    }
  };

  const handleHourChange = (hour) => setDepHour(hour);

  const handlePredict = async () => {
    if (!selectedOrigin || !selectedDest || !selectedAirline || !dayOfWeek || depHour === null) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Debug values:', {
    origin: selectedOrigin,
    dest: selectedDest,
    airline: selectedAirline,
    dayOfWeek: dayOfWeek,
    depHour: depHour
  });

    setLoading(true);
    
    try {
      const response = await fetch('https://flight-delay-prediction-system.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: selectedOrigin.value,
          dest: selectedDest.value,
          airline: selectedAirline.value,
          day_of_week: dayOfWeek,
          dep_hour: depHour
        })
      });

      const result = await response.json();
      setPrediction(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-green-300 to-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg bg-white/90 shadow-2xl rounded-3xl p-8 backdrop-blur-lg border border-white/20">
          {/* Header with gradient text */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
              ✈️ Flight Delay Predictor
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6">
            {/* Origin Section */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl blur opacity-25"></div>
              <div className="relative bg-white rounded-xl p-4">
                <p className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-emerald-500 mr-2">🛫</span>
                  Choose Origin
                </p>
                <OriginDropdown 
                  selectedValue={selectedOrigin}
                  onChange={handleOriginChange}
                />
              </div>
            </div>
            
            {/* Destination Section */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl blur opacity-25"></div>
              <div className="relative bg-white rounded-xl p-4">
                <p className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-blue-500 mr-2">🛬</span>
                  Choose Destination
                </p>
                <DestDropdown 
                  selectedValue={selectedDest}
                  onChange={handleDestinationChange}
                />
              </div>
            </div>
            
            {/* Airline Section */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl blur opacity-25"></div>
              <div className="relative bg-white rounded-xl p-4">
                <p className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-purple-500 mr-2">🏢</span>
                  Choose Airline
                </p>
                <AirlineDropdown 
                  selectedValue={selectedAirline}
                  onChange={handleAirlineChange}
                />
              </div>
            </div>
            
            {/* Date Section */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl blur opacity-25"></div>
              <div className="relative bg-white rounded-xl p-4">
                <p className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-orange-500 mr-2">📅</span>
                  Departure Date
                </p>
                <DateSelector
                  selectedDate={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
            </div>

            {/* Hour Section */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl blur opacity-25"></div>
              <div className="relative bg-white rounded-xl p-4">
                <p className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-green-500 mr-2">🕐</span>
                  Departure Hour
                </p>
                <HourSelector
                  selectedHour={depHour}
                  onChange={handleHourChange}
                />
              </div>
            </div>

            {/* Predict Button */}
            <div className="pt-4">
              <button 
                onClick={handlePredict}
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-all duration-300 transform relative overflow-hidden
                  ${loading 
                    ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'}
                `}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform ${loading ? '' : 'animate-pulse'}`}></div>
                <span className="relative flex items-center justify-center">
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Predicting...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">🔮</span>
                      Predict Delay
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Results Section */}
          {prediction && (
            <div className="mt-8 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-white/50">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  Prediction Results
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-white/60 rounded-xl">
                    <span className="text-2xl mr-3">⏰</span>
                    <div>
                      <p className="font-semibold text-gray-800">Delay Probability</p>
                      <p className="text-lg font-bold text-indigo-600">{(prediction.delay_probability * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default App