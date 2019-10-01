import subprocess
import json
import requests

DIFFICULTIES = ['easy', 'medium', 'hard']
PLANET_NAMES = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter',
                 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Europa']

while True:
    print('Type \"new\" to start a new game, \"travel\" to travel somewhere, or \"status\" to view the current game state. CTRL+C to quit.')
    command = input().lower()
    
    if command == 'new':
        url = 'http://127.0.0.1:5000/Space-Traders'
        print('Enter your difficulty (easy, medium, hard):')
        command = input().lower()
        while command not in DIFFICULTIES:
            print('Difficulty not recognized. Enter your difficulty (easy, medium, hard):')
            command = input().lower()
        
        difficulty = command
        while True:
            print('Enter your attributes (list of 4 ints like 1,1,1,1):')
            command = input().lower()
            builder = ''
            attributes = []
            for i, char in enumerate(command):
                if not char == ',':
                    builder += char
                else:
                    attributes.append(int(builder))
                    builder = ''
                if i == (len(command) - 1):
                    attributes.append(int(builder))
            if not len(attributes) == 4:
                print('Incorrect number of attributes entered or format incorrect.')
            else:
                break
        attributes = command
        
        payload = {'difficulty': difficulty, 'attributes': attributes}
        requests.post(url, headers={'content-type' : 'application/json'}, data=json.dumps(payload))
        print('done.')

    elif command == 'travel':
        print('Enter desired location:')
        command = input()
        while command not in PLANET_NAMES:
            print('Planet not recognized. (Make sure you enter it with an uppercase first letter!')
            print('Enter desired location:')
            command = input()
        url = 'http://127.0.0.1:5000/Space-Traders/travel/' + command
        requests.put(url)
        print('done.')

    elif command == 'status':
        url = 'http://127.0.0.1:5000/Space-Traders'
        r = requests.get(url)
        print(r.text)
        print('done.')
    
    else:
        print('Command not recognized.')