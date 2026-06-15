from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_db_connection

app = Flask(__name__)
CORS(app)

# CREATE
@app.route("/employees", methods=["POST"])
def add_employee():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    query = "INSERT INTO employees (name, email, department, salary) VALUES (%s,%s,%s,%s)"
    values = (data["name"], data["email"], data["department"], data["salary"])
    cursor.execute(query, values)

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Employee added"}), 201


# READ
@app.route("/employees", methods=["GET"])
def get_employees():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM employees")
    employees = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(employees)


# UPDATE
@app.route("/employees/<int:id>", methods=["PUT"])
def update_employee(id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    query = """UPDATE employees 
               SET name=%s, email=%s, department=%s, salary=%s 
               WHERE id=%s"""
    values = (data["name"], data["email"], data["department"], data["salary"], id)

    cursor.execute(query, values)
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Employee updated"})


# DELETE
@app.route("/employees/<int:id>", methods=["DELETE"])
def delete_employee(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM employees WHERE id=%s", (id,))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Employee deleted"})


if __name__ == "__main__":
    app.run(debug=True)
