import json
import random
import string

import requests

#This file exists as a way to use and test the REST API without using Postman or cURL
#Commands that can be used are 'new', 'travel', 'status', 'player', 'ship', 'randnew'
#(cont): 'buy', 'sell'
#see commands() for all commands and their mappings

DIFFICULTIES = ['easy', 'medium', 'hard']
PLANET_NAMES = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter',
                'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Europa']

def new():  #generate new game state with some input validation
    url = 'http://127.0.0.1:5000/Space-Traders'
    print('Enter your difficulty (easy, medium, hard):')
    command = input().lower()
    while command not in DIFFICULTIES:
        print('Difficulty not recognized. Enter your difficulty (easy, medium, hard):')
        command = input().lower()

    #there used to be input validation here but it was buggy.
    #just use the tool correctly and don't mess up
    #worst case seems to be a 500 error with no crash so won't fix
    difficulty = command
    print('Enter your attributes (list of 4 ints like 1,1,1,1):')
    command = input()
    attributes = command

    while True:
        print('Enter name:')
        command = input()
        if not command == '':
            break
    name = command

    payload = {'difficulty': difficulty, 'attributes': attributes, 'name': name}
    req = requests.post(url,
                        headers={'content-type' : 'application/json'},
                        data=json.dumps(payload))
    if req.status_code == 200:
        print('Successful request.')
    elif req.status_code == 500:
        print('Error in request with status code 500. This probably means your \
input is improperly formatted. (likely the \"attributes\" field!)')
    else:
        print('Error in request with status code', req.status_code)

def travel():   #PUT request to travel with input validation
    print('Enter desired location:')
    command = input()
    command = command[0].upper() + command[1:]
    while command not in PLANET_NAMES:
        print('Planet not recognized.')
        print('Enter desired location:')
        command = input()
        command = command[0].upper() + command[1:]
    url = 'http://127.0.0.1:5000/Space-Traders/travel/' + command
    req = requests.put(url)
    if req.status_code == 200:
        print('Successful request.')
    else:
        print('Error in request with status code', req.status_code)

def buy():  #PUT request to buy item, no input validation (yet)
    print('Enter item:')
    command = input()
    command = command[0].upper() + command[1:]
    url_builder = command
    print('Enter amount:')
    command = input()
    url_builder += '/' + command
    url = 'http://127.0.0.1:5000/Space-Traders/buy/' + url_builder
    req = requests.put(url)
    if req.status_code == 200:
        print(req.json())
    else:
        print('Error in request with status code', req.status_code)

def sell(): #PUT request to sell item, no input validation (yet)
    print('Enter item:')
    command = input()
    command = command[0].upper() + command[1:]
    url_builder = command
    print('Enter amount:')
    command = input()
    url_builder += '/' + command
    url = 'http://127.0.0.1:5000/Space-Traders/sell/' + url_builder
    req = requests.put(url)
    if req.status_code == 200:
        print(req.json())
    else:
        print('Error in request with status code', req.status_code)

def status():  #print full json dump received from GET request
    url = 'http://127.0.0.1:5000/Space-Traders'
    req = requests.get(url)
    print(req.text)
    if req.status_code == 200:
        print('Successful request.')
    else:
        print('Error in request with status code', req.status_code)

def player():   #short status, just prints player and strips distances. not exposed
    url = 'http://127.0.0.1:5000/Space-Traders'
    req = requests.get(url)
    player_get = req.json().get('Player')
    print(json.dumps(player_get, indent=4))
    if req.status_code == 200:
        print('Successful request.')
    else:
        print('Error in request with status code', req.status_code)

def ship(): #same as player but for ship
    url = 'http://127.0.0.1:5000/Space-Traders'
    req = requests.get(url)
    print(json.dumps(req.json().get('Ship'), indent=4))
    if req.status_code == 200:
        print('Successful request.')
    else:
        print('Error in request with status code', req.status_code)

def randnew():  #generate new game state, randomized. not exposed
    url = 'http://127.0.0.1:5000/Space-Traders'
    name = ''.join(random.choices(string.ascii_lowercase, k=random.randint(1, 6)))
    attributes_list = [random.randint(1, 15) for i in range(4)]
    attributes = ''
    for attr in attributes_list:
        attributes += str(attr) + ','
    attributes = attributes[0:len(attributes)-1]
    difficulty = DIFFICULTIES[random.randint(0, 2)]

    payload = {'difficulty': difficulty, 'attributes': attributes, 'name': name}

    req = requests.post(url,
                        headers={'content-type' : 'application/json'},
                        data=json.dumps(payload))
    print('randomized game state: ', name, attributes, difficulty)

    if req.status_code == 200:
        print('Successful request.')
    else:
        print('Error in request with status code', req.status_code)

def commands(command):    #super pythonic way to handle a switch statement with functions
    return {'new' : new,
            'travel' : travel,
            'buy' : buy,
            'sell' : sell,
            'status' : status,
            'get' : status,
            'player' : player,
            'ship' : ship,
            'cargo' : ship,
            'randnew' : randnew
           }.get(command, 'Not recognized')

if __name__ == '__main__':
    while True:
        print('Type \"new\" to start a new game, \"travel\" to travel \
somewhere, or \"status\" to view the current game state. CTRL+C to quit.')
        global_command = input().lower()
        global_c = commands(global_command)
        if global_c == 'Not recognized':
            print('Command not recognized.')
        else:
            global_c()
