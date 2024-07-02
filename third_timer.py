import mysql.connector as connector
import pandas as pd
import os

conn = connector.connect(
    host="localhost",
    user="root",
    password="gehad_db28",
    database="gp_questionnaire"
)

cursor = conn.cursor()

folder_path = "F:/Study/GP/Questionnaire/Website/DB Modified/try/Modified"

files = os.listdir(folder_path)

csv_files = [file for file in files if file.endswith(".csv")]

# for csv_file in csv_files:
#     file_path = os.path.join(folder_path, csv_file)
#     df = pd.read_csv(file_path)
#     words, number = df.at[33, 'id'].rsplit(' ', 1)

#     df.at[33, 'id'] = words
#     df.at[33, 'Question'] = number

#     modified_file_path = os.path.join("F:/Study/GP/Questionnaire/Website/DB Modified/try/Modified", csv_file)
#     df.to_csv(modified_file_path, index=False)

for csv_file in csv_files:
    file_path = os.path.join(folder_path, csv_file)
    df = pd.read_csv(file_path)
    value = df.at[33, 'Question']
    email = df.at[30, 'Question'].strip()

    print(value)
    print(f"'{email}'")

    cursor.execute(f"""UPDATE vrscores JOIN user ON user.userId = vrscores.userId SET thirdTimer = {value} WHERE user.email = '{email}'""")
    conn.commit()
    cursor.fetchall()

