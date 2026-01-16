from flask import Flask, request, jsonify
from flask_cors import CORS
from collections import OrderedDict
from faker import Faker

app = Flask(__name__)
CORS(app)

fake = Faker('it_IT')

generi = [
    "Romanzo", "Fantascienza", "Giallo", "Fantasy", 
    "Saggio", "Biografia", "Horror", "Storico", "Poesia"
]

data = []

for i in range(20):
    data.append(
        {
            "id": i + 1,
            "titolo": fake.sentence(nb_words=4).replace(".", "").title(),
            "autore": fake.name(),
            "anno": fake.year(),
            "genere": fake.random_element(elements=generi)
        }
    )

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend Libreria - Usa /api/libri per accedere ai dati"})


def main():
    print("backend con 20 libri")

@app.route("/api/libri", methods=["GET"])
def get_libri():
    return jsonify(data)


@app.route("/api/libri", methods=["POST"])
def post_libri():
    nuovo_libro = request.get_json()
    nuovo_libro["id"] = max([libro["id"] for libro in data], default=0) + 1
    data.append(nuovo_libro)
    return jsonify(nuovo_libro), 201


@app.route("/api/libri/<int:libro_id>", methods=["DELETE"])
def delete_libro(libro_id):
    global data
    data = [libro for libro in data if libro["id"] != libro_id]
    return "", 204


@app.route("/api/libri", methods=["DELETE"])
def delete_tutti_libri():
    global data
    data = []
    return "", 204




if __name__ == "__main__":
    main()
app.run("0.0.0.0", port=11000, debug=True)
