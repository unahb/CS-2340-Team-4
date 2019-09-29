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

        self.game_regions = {}

        for name in NAMES:  # add regions to game_regions
            x = random.randint(-200, 200)
            y = random.randint(-200, 200)
            tech = random.randint(1, len(TECH_LEVELS))
            game_regions[name] = Region((x, y), tech, name)

    #


class Region:
    def __init__(self, coordinates, ech_level, name):
        self.coordinates = coordinates
     self.tech_level = tech_level
        self.name = name


class Player:
    def __init__(attributes):  # Pilot, Fighter, Merchant, Engineer
        self. attributes = attributes

        # getterregion(self):
        return self._region

    def get_credits(self):
        get_credits(self):
        return self._credits

    def set_region(self, x):

        self._region = x

    def set_credits(self, x):
        self._credits = x

def Universe
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
