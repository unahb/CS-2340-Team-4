from flask import Flask
import random
from flask_restful import reqparse, abort, Api, Resource


class Game:
    def __init__(self, difficulty):
        self.difficulty = difficulty
        NAMES = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter',
                 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Europa']
        TECH_LEVELS = ['PRE-AG', 'AGRICULTURE', 'MEDIEVAL',
                       'RENAISSANCE', 'INDUSTRIAL', 'MODERN', 'FUTURISTIC']

        self.universe = Universe(NAMES, TECH_LEVELS)


class Region:
    def __init__(self, coordinates, tech_level, name):
        self.__coordinates = coordinates # double underscore for private
        self.__tech_level = tech_level
        self.__name = name


class Player:
    def __init__(self, attributes, region):  
        self._attributes = attributes # Pilot, Fighter, Merchant, Engineer
        self._region = region # single underscore for protected

    # getters
    def get_region(self):
        return self._region
    def get_credits(self):
        return self._credits

    # setters
    def set_region(self, x):
        self._region = x
    def set_credits(self, x):
        self._credits = x

class Universe:
    def __init__(self, planets, tech_names):
        # Needs to be singleton (can't make more than 1)
        if Universe.__instance != None:
            raise Exception("This class is a singleton!")
        else:
            self.game_regions = {}

            for name in names:  # add regions to game_regions
                while True:
                    valid_coordinates = true;
                    x = random.randint(-200, 200)
                    y = random.randint(-200, 200)
                    for name in names:
                        if (game_regions[name].coordinates[0]) - x < 5:
                            valid_coordinates = False
                        if (game_regions[name].coordinates[1]) - y < 5:
                            valid_coordinates = False
                            
                    if valid_coordinates == True:
                        break                        

                tech = random.randint(1, len(tech_names))
                game_regions[name] = Region((x, y), tech_names[tech], planets)

app = Flask(__name__)
api = Api(app)

TODOS = {
    'todo1': {'task': 'build an API'},
    'todo2': {'task': '?????'},
    'todo3': {'task': 'profit!'},
}


def abort_if_todo_doesnt_exist(todo_id):
    if todo_id not in TODOS:
        abort(404, message="Todo {} doesn't exist".format(todo_id))


parser = reqparse.RequestParser()
parser.add_argument('task')


# Todo
# shows a single todo item and lets you delete a todo item
class Todo(Resource):
    def get(self, todo_id):
        abort_if_todo_doesnt_exist(todo_id)
        return TODOS[todo_id]

    def delete(self, todo_id):
        abort_if_todo_doesnt_exist(todo_id)
        del TODOS[todo_id]
        return '', 204

    def put(self, todo_id):
        args = parser.parse_args()
        task = {'task': args['task']}
        TODOS[todo_id] = task
        return task, 201


# TodoList
# shows a list of all todos, and lets you POST to add new tasks
class TodoList(Resource):
    def get(self):
        return TODOS

    def post(self):
        args = parser.parse_args()
        todo_id = int(max(TODOS.keys()).lstrip('todo')) + 1
        todo_id = 'todo%i' % todo_id
        TODOS[todo_id] = {'task': args['task']}
        return TODOS[todo_id], 201

class StartGame()
##
# Actually setup the Api resource routing here
##
api.add_resource(TodoList, '/todos')
api.add_resource(Todo, '/todos/<todo_id>')


api.add_resource(, '/start')
api.add_resource(, '/config')
api.add_resource(, '/summary')
api.add_resource(, '/game')


if __name__ == '__main__':
    app.run(debug=True)
