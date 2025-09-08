import xgboost as xgb
import pandas as pd
import numpy as np
import joblib
import flask
import flask_cors
import os

app = flask.Flask(__name__)
flask_cors.CORS(app)

# Load models
distance_model = xgb.XGBRegressor()
distance_model.load_model('./model/distance_model.json')

distance_group_model = xgb.XGBRegressor()
distance_group_model.load_model('./model/distance_group_model.json')

crs_elapsed_model = xgb.XGBRegressor()
crs_elapsed_model.load_model('./model/crs_elapsed_model.json')

flight_delay_model = xgb.XGBClassifier()
flight_delay_model.load_model('./model/flight_delay_model.json')

origin_encoder = joblib.load('./model/origin_encoder.pkl')
dest_encoder = joblib.load('./model/dest_encoder.pkl')
airline_encoder = joblib.load('./model/airline_encoder.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    args = flask.request.json
    origin = args.get('origin')
    dest = args.get('dest')
    airline = args.get('airline')
    day_of_week = args.get('day_of_week')
    dep_hour = args.get('dep_hour')

    origin_enc = origin_encoder.transform([origin])[0]
    dest_enc = dest_encoder.transform([dest])[0]
    airline_enc = airline_encoder.transform([airline])[0]

    X_dist = np.array([[origin_enc, dest_enc]])

    distance = distance_model.predict(X_dist)[0]
    distance_group = distance_group_model.predict(X_dist)[0]
    crs_elapsed = crs_elapsed_model.predict(X_dist)[0]
    is_weekend = 1 if day_of_week in [6, 7] else 0
    is_rush_hour = 1 if dep_hour in [7, 8, 9, 16, 17, 18] else 0


    features = [
        day_of_week,
        dep_hour,
        is_weekend,
        is_rush_hour,
        distance,
        distance_group,
        crs_elapsed,
        1,
        origin_enc,
        dest_enc,
        airline_enc
    ]

    features = np.array(features).reshape(1, -1)
    delay_prob = flight_delay_model.predict_proba(features)[0][1]

    return flask.jsonify({
        'delay_probability': float(delay_prob),
        'distance': float(distance),
        'distance_group': float(distance_group),
        'crs_elapsed_time': float(crs_elapsed)
    })


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)