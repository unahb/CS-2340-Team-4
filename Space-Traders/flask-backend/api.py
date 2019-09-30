import random 

from flask import Flask, request
from flask_restful import reqparse, abort, Api, Resource

import game

app = Flask(__name__)
api = Api(app)

space_traders = game.Game('easy', [1,1,1,1]) #TODO: make cleaner

TODOS = {
    'todo1': {'task': 'build an API'},
    'todo2': {'task': '?????'},
    'todo3': {'task': 'profit!'},
}


def abort_if_todo_doesnt_exist(todo_id):
    if todo_id not in TODOS:
        abort(404, message="Todo {} doesn't exist".format(todo_id))


#parser = reqparse.RequestParser()
#parser.add_argument('task')


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

class SpaceTraders(Resource):
    def get(self):
        print(space_traders)
        return '' #TODO add in return for JSON

    def post(self):
        #expect a POST in the form of 'difficulty=string attributes=[int, int, int, int]'
        parser = reqparse.RequestParser()
        parser.add_argument('difficulty', type=str, required=True, location='form')
        parser.add_argument('attributes', type=list, required=True, location='form')
        args = parser.parse_args()

        space_traders = game.Game(args['difficulty'], args['attributes'])

        return '', 200 #TODO add in return for JSON


class Travel(Resource):
    def put(self, planet_id):
        space_traders.travel(planet_id)
        return '', 200 #TODO add in return for JSON


##
# Actually setup the Api resource routing here
##
api.add_resource(TodoList, '/todos')
api.add_resource(Todo, '/todos/<todo_id>')

api.add_resource(Travel, '/Space-Traders/travel/<planet_id>')
api.add_resource(SpaceTraders, '/Space-Traders')


if __name__ == '__main__':
    app.run(debug=True)
