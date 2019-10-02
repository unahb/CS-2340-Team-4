import json
import random
import string

import requests

#This file exists as a way to interface and test the REST API without using Postman/

DIFFICULTIES = ['easy', 'medium', 'hard']
PLANET_NAMES = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter',
                'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Europa']

while True:
    print('Type \"new\" to start a new game, \"travel\" to travel \
somewhere, or \"status\" to view the current game state. CTRL+C to quit.')
    command = input().lower()

    if command == 'new':
        url = 'http://127.0.0.1:5000/Space-Traders'
        print('Enter your difficulty (easy, medium, hard):')
        command = input().lower()
        while command not in DIFFICULTIES:
            print('Difficulty not recognized. Enter your \
difficulty (easy, medium, hard):')
            command = input().lower()

        difficulty = command
        while True:
            print('Enter your attributes (list of 4 ints like 1,1,1,1):')
            command = input().lower()
            builder = ''
            attributes = []
            for i, char in enumerate(command):
                if char != ',':
                    builder += char
                else:
                    builder = ''
                    attributes.append(int(builder))
                if i == (len(command) - 1):
                    attributes.append(int(builder))
            if len(attributes) != 4:
                print('Incorrect number of attributes entered or format incorrect.')
            else:
                break
        attributes = command

        while True:
            print('Enter name:')
            command = input()
            if not command:
                break
        name = command

        payload = {'difficulty': difficulty, 'attributes': attributes, 'name': name}
        r = requests.post(url,
                          headers={'content-type' : 'application/json'},
                          data=json.dumps(payload))
        if r.status_code == 200:
            print('Successful request.')
        else:
            print('Error in request with status code ', r.status_code)

    elif command == 'travel':
        print('Enter desired location:')
        command = input()
        while command not in PLANET_NAMES:
            print('Planet not recognized. (Make sure you enter it with an uppercase first letter!')
            print('Enter desired location:')
            command = input()
        url = 'http://127.0.0.1:5000/Space-Traders/travel/' + command
        r = requests.put(url)
        if r.status_code == 200:
            print('Successful request.')
        else:
            print('Error in request with status code ', r.status_code)

    elif command == 'status':
        url = 'http://127.0.0.1:5000/Space-Traders'
        r = requests.get(url)
        print(r.text)
        if r.status_code == 200:
            print('Successful request.')
        else:
            print('Error in request with status code ', r.status_code)

    elif command == 'randnew':
        url = 'http://127.0.0.1:5000/Space-Traders'
        name = ''.join(random.choices(string.ascii_lowercase, k=random.randint(1, 6)))
        attributeslist = [random.randint(1, 15) for i in range(4)]
        attributes = ''
        for a in attributeslist:
            attributes += str(a) + ','
        attributes = attributes[0:len(attributes)-1]
        difficulty = DIFFICULTIES[random.randint(0, 2)]

        payload = {'difficulty': difficulty, 'attributes': attributes, 'name': name}

        r = requests.post(url,
                          headers={'content-type' : 'application/json'},
                          data=json.dumps(payload))
        print('randomized game state: ', name, attributes, difficulty)

        if r.status_code == 200:
            print('Successful request.')
        else:
            print('Error in request with status code ', r.status_code)

    else:
        print('Command not recognized.')
