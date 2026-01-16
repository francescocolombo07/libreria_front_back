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

def main():
    print("backend con 20 libri")




if __name__ == "__main__":
    main()
app.run("0.0.0.0", port=11000, debug=True)
