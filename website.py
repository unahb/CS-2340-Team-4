from flask import Flask, render_template, request, redirect, url_for
app = Flask(__name__)

@app.route('/')
def homepage():
    return render_template('homepage.html')

@app.route('/config.html', methods = ['GET'])
@app.route('/config', methods = ['GET'])
def config():
    return render_template('config.html')

@app.route('/Space_Trader', methods = ['Post', 'GET'])
@app.route('/Space_Trader.html', methods = ['POST', 'GET'])
def game():
    if request.method == 'POST':
        #pull data from previous request
        name = request.form["charname"]
        difficulty = request.form["difficulty"]
        pilot = request.form["pilot"]
        fighter = request.form["fighter"]
        merchant = request.form["merchant"]
        engineer = request.form["engineer"]

        #set money based on difficulty
        money = 100
        if difficulty == 'easy':
            money = 1000
        elif difficulty == 'medium':
            money = 500

        return render_template('Space_Trader.html', character=name, difficulty=difficulty, pilot=pilot, fighter=fighter, merchant=merchant, engineer=engineer, money=money)
    if request.method == 'GET':
        return redirect(url_for('config'))

if __name__ == '__main__':
    app.run(debug = True)
