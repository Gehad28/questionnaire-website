import mysql.connector as connector
import pandas as pd
import os
import numpy as np

conn = connector.connect(
    host="localhost",
    user="root",
    password="gehad_db28",
    database="gp_questionnaire"
)

cursor = conn.cursor()

cursor.execute("SELECT * FROM answer")
ans = cursor.fetchall()

cursor.execute("SELECT userId FROM user")
userId = cursor.fetchall()
userId = [row[0] for row in userId]



# for i in userId:
#     cursor.execute(f"SELECT * FROM answer WHERE userId = {i}")
#     ans = cursor.fetchall()
#     scoreFA, scoreRW, scorePU, scoreAE = 0, 0, 0, 0
#     itemsFA, itemsRW, itemsPU, itemsAE = 0, 0, 0, 0
#     for row in ans:
#         if (row[3] == 'PU' and row[2] == 12) or (row[3] == 'AE' and row[2] == 18):
#             pass
#         elif row[3] == 'FA':
#             scoreFA += row[5]
#             itemsFA += 1
#         elif row[3] == 'RW':
#             if row[2] == 22:
#                 scoreRW += np.abs(row[5] - 6)
#             else:
#                 scoreRW += row[5]
#             itemsRW += 1
#         elif row[3] == 'PU':
#             if row[2] == 13:
#                 scorePU += row[5]
#             else:
#                 scorePU += np.abs(row[5] - 6)
#             itemsPU += 1
#         elif row[3] == 'AE':
#             scoreAE += row[5]
#             itemsAE += 1
#     scoreFA = scoreFA/itemsFA
#     scoreRW = scoreRW/itemsRW
#     scoreAE = scoreAE/itemsAE
#     scorePU = scorePU/itemsPU
#     cursor.execute(f"UPDATE uesscores SET VR_FA = {scoreFA}, VR_RW = {scoreRW}, VR_AE = {scoreAE}, VR_PU = {scorePU} WHERE userId = {i}")
#     conn.commit()

for i in userId:
    vr_score, reha_score = 0, 0
    cursor.execute(f"SELECT * FROM uesscores WHERE userId = {i}")
    scores = cursor.fetchall()
    vr_score = scores[0][2] + scores[0][3] + scores[0][4] + scores[0][5]
    reha_score = scores[0][7] + scores[0][8] + scores[0][9] + scores[0][10]
    cursor.execute(f"UPDATE uesscores SET VR_total = {vr_score}, reha_total = {reha_score} WHERE userId = {i}")
    conn.commit()
