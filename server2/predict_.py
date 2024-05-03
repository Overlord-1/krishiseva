from flask import Flask, request, jsonify
import numpy as np
from tensorflow.keras.preprocessing import image
import json
import pickle

# Load the trained model from the .pkl file
with open('knn_model.pkl', 'rb') as file:
    classifier = pickle.load(file)

# Load the StandardScaler
with open('scaler.pkl', 'rb') as file:
    sc = pickle.load(file)

app = Flask(__name__)

# Load the saved model
import tensorflow as tf
loaded_model = tf.keras.models.load_model("my_model.keras")

# Load class indices from the saved file
with open('class_indices.json', 'r') as f:
    class_indices = json.load(f)
@app.route('/recognize', methods=['GET'])
def recognize():
    try:
# Load the single prediction image
# test_image_path = '/Users/deeppatel/Desktop/single_prediction/attachments/3.JPG'
        test_image_path = '../server/ai/file.jpeg' 
        test_image = image.load_img(test_image_path, target_size=(64, 64))
        test_image = image.img_to_array(test_image)
        test_image = np.expand_dims(test_image, axis=0)

# Make prediction using the loaded model
        result = loaded_model.predict(test_image)
        predicted_class_index = np.argmax(result)

# Get predicted class label using the loaded class indices
        predicted_class_label = list(class_indices.keys())[predicted_class_index]
        return jsonify({"predicted_disease": predicted_class_label}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


@app.route('/predict', methods=['POST'])
def predict():
    try:
    # Get data from the request
        request_data = request.get_json()
        print("hello",request_data )
        nitrates = request_data.get('nitrates')
        phosphates = request_data.get('phosphates')
        potassium = request_data.get('potassium')
        temperature = request_data.get('temperature')
        humidity = request_data.get('humidity')
        ph = request_data.get('ph')
        rainfall = request_data.get('rainfall')
         # Prepare the new data point
        new_data_point = [[nitrates, phosphates, potassium, temperature, humidity, ph, rainfall]]

        # Apply the StandardScaler to the new data point
        scaled_new_data_point = sc.transform(new_data_point)

        # Predict the crop type using the loaded model
        predicted_crop = classifier.predict(scaled_new_data_point)

        # Return the prediction as JSON
        return jsonify({'predicted_crop': predicted_crop.tolist()})
    except Exception as e:
        print(e)
        return jsonify("error"), 500






if __name__ == '__main__':
    app.run(debug=True)
