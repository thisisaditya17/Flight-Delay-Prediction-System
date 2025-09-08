# ✈️ Flight Delay Prediction System

A comprehensive machine learning system that predicts flight delays using XGBoost with 77% accuracy on 558K+ flight records. Built with React frontend, Flask backend, and multi-model ML architecture.

## 📂 Dataset Access

You can download the dataset used for this project from [Kaggle: Flight Delay Dataset 2018-2024](https://www.kaggle.com/datasets/shubhamsingh42/flight-delay-dataset-2018-2024/data).

## 🎯 Project Overview

This system analyzes flight data to predict delay probabilities, helping airlines and passengers make informed decisions. The model identifies departure time as the primary delay driver (32.8% feature importance) and provides actionable insights for flight planning.

### Key Features
- **Real-time delay prediction** with probability scores
- **Multi-model architecture** for feature prediction and delay classification  
- **Beautiful React frontend** with gradient animations and responsive design
- **REST API backend** serving ML predictions
- **77% accuracy** on large-scale flight dataset

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/flight-delay-predictor
cd flight-delay-predictor
```

2. **Backend Setup**
```bash
cd backend
pip install -r requirements.txt
python app.py
```

3. **Frontend Setup**
```bash
cd frontend  
npm install
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:5173
- API: http://localhost:5000

## 📊 Model Performance

| Metric | Value |
|--------|-------|
| **Accuracy** | 77.0% |
| **Training Data** | 558,715 flights |
| **Features** | 11 engineered features |
| **Model Type** | XGBoost Binary Classifier |

### Top Features by Importance
1. **Departure Hour** (32.8%) - Time-based delay patterns
2. **Airline** (16.5%) - Carrier performance variations  
3. **Origin Airport** (10.1%) - Airport congestion effects
4. **Day of Week** (8.4%) - Weekly travel patterns
5. **Destination** (6.7%) - Arrival airport factors

## 🏗️ Architecture

```
├── backend/
│   ├── app.py              # Flask API server
│   └── requirements.txt    # Python dependencies
├── model/                  # Saved ML models and encoders
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React application
│   │   └── ...
│   └── package.json       # Node dependencies
└── README.md
```

### System Components

**Frontend (React)**
- Interactive flight selection forms
- Real-time prediction display
- Responsive design with Tailwind CSS
- Loading states and error handling

**Backend (Flask + XGBoost)**
- Multi-model prediction pipeline
- Distance and duration estimation
- Delay probability calculation
- CORS-enabled REST API

**ML Pipeline**
- Feature engineering (time, airport, airline encoding)
- XGBoost classifier for delay prediction
- Auxiliary models for flight characteristics
- Label encoders for categorical variables

## 🔧 API Documentation

### Predict Flight Delay
```http
POST /predict
```

**Request Body:**
```json
{
  "origin": "ATL",
  "dest": "LAX", 
  "airline": "AA",
  "day_of_week": 2,
  "dep_hour": 14
}
```

**Response:**
```json
{
  "delay_probability": 0.231,
  "distance": 1946.5,
  "distance_group": 7.0,
  "crs_elapsed_time": 300.2
}
```

## 🛠️ Technologies Used

**Machine Learning**
- XGBoost - Primary ML framework
- scikit-learn - Data preprocessing and metrics
- pandas/numpy - Data manipulation
- joblib - Model persistence

**Backend**
- Flask - Web framework
- Flask-CORS - Cross-origin support
- Python 3.9+ - Runtime environment

**Frontend** 
- React 18 - UI framework
- Vite - Build tool and dev server
- Tailwind CSS - Styling framework

## 📊 Dataset Information

- **Source**: US Bureau of Transportation Statistics
- **Time Period**: January 2018-2024
- **Records**: 558,715 flights after cleaning
- **Features**: Flight times, airports, airlines, distances
- **Target**: Binary delay classification (15+ minutes)


## 👨‍💻 Author

**Aditya Joshi**
- GitHub: [@thisisaditya17](https://github.com/thisisaditya17)
- LinkedIn: [thisisaditya17](https://linkedin.com/in/thisisaditya17)

## 🙏 Acknowledgments

- Bureau of Transportation Statistics for flight data
- XGBoost team for the excellent ML framework
- React and Flask communities for comprehensive documentation
