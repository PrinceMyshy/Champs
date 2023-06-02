#*! table.py v1.0 June 1 2023

import sqlite3

# Create a connection to the database
conn = sqlite3.connect("accounts.db")
cursor = conn.cursor()

# Create the table "account_info"
cursor.execute("""
    CREATE TABLE IF NOT EXISTS account_info (
        account_name TEXT,
        password TEXT,
        email TEXT,
        id INTEGER,
        date_of_creation DATE,
        email_verified INTEGER
    )
""")

# Commit the changes and close the connection
conn.commit()
conn.close()
