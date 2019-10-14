import random

PLANET_NAMES = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter',
                'Europa', 'Saturn', 'Uranus', 'Neptune', 'Pluto']
TECH_LEVELS = ['PRE-AG', 'AGRICULTURE', 'MEDIEVAL',
               'RENAISSANCE', 'INDUSTRIAL', 'MODERN', 'FUTURISTIC']
CREDITS = {'easy': 2000, 'medium': 1000, 'hard': 500}
SPACESHIP_TYPES = {'Starship': {'name': 'Starship', 'cargo_space':50, 'fuel':1000, 'health':15}, 'Jet':{}, 'Wasp':{}, 'Ladybug':{}}
#TODO: actually fill in all that crap ^^ lololol (and that crap too below)
MARKET_ITEMS = {'PRE-AG':['Wood', 'Gold'], 'AGRICULTURE':['Wood', 'Gold'], 'MEDIEVAL':['Wood', 'Gold'],
               'RENAISSANCE':['Wood', 'Gold'], 'INDUSTRIAL':['Wood', 'Gold'], 'MODERN':['Wood', 'Gold'], 'FUTURISTIC':['Wood', 'Gold']}

def fuel_cost_helper(distance, pilot_attribute):
    return int(1 / pilot_attribute * distance)

def item_cost_helper(base_cost, merchant_attribute, buy=True):
    if buy:
        return int(base_cost * merchant_attribute * .1)
    return int(base_cost * merchant_attribute * 1.1)

class Game:
    def __init__(self, difficulty='easy', attributes=None, name='John Doe'):
        #set parameters to defaults if they aren't correctly formatted
        if difficulty not in ('easy', 'medium', 'hard'):    #difficulty
            difficulty = 'easy'
            print('difficulty set to default')
        if attributes is None or not isinstance(attributes, list):  #attributes
            attributes = [1, 1, 1, 1]
            print('attributes set to default')
        if len(attributes) != 4:
            attributes = [1, 1, 1, 1]
            print('attributes set to default')
        for num in attributes:
            if not isinstance(num, int):
                attributes = [1, 1, 1, 1]
                print('attributes set to default')
                break
        if not isinstance(name, str):   #name
            name = 'John Doe'
            print('name set to default')

        #initialize new game
        self._difficulty = difficulty
        self._universe = Universe()
        starting_planet_name = PLANET_NAMES[random.randint(0, len(PLANET_NAMES) - 1)]
        starting_planet = self._universe.get_game_regions()[starting_planet_name]
        self._player = Player(attributes, starting_planet, CREDITS[self._difficulty], name)
        self._player.calc_fuel_costs(PLANET_NAMES, self._universe.get_region_distances().get_distances(self._player.get_region().get_name()))
        self._ship = Ship(SPACESHIP_TYPES['Starship'])

        print('New game initialized with player starting at ', self._player.get_region())
        print('Universe Configuration: ', str(self._universe))

    def travel(self, region):   #travel when the api is called to do so. fuel costs automatically subtracted
        cost = self._player.get_fuel_costs()[region]
        self._ship.remove_fuel(cost)
        self._player.set_region(self._universe.get_game_regions()[region])
        self._player.calc_fuel_costs(PLANET_NAMES, self._universe.get_region_distances().get_distances(self._player.get_region().get_name()))

    def transaction(self, region, item, item_amount, buy=True): #buy/sell when api asks to. item is added to ship and credits subtracted
        if buy:
            item_key = 'buy_' + item
            planet_price = self._player.get_region_market_adjusted_prices()[item_key]
            amount =  planet_price * int(item_amount)
            self._player.transaction(amount*-1)
            self._ship.add_cargo(item, int(item_amount))
        else:
            item_key = 'sell_' + item
            planet_price = self._player.get_region_market_adjusted_prices()[item_key]
            amount =  planet_price * int(item_amount)
            self._player.transaction(amount)
            self._ship.remove_cargo(item, int(item_amount))
        print('Successful transaction of ' + str(item_amount) + ' ' + item + ' on ' + region)   #print for debug
        print('Planet item price: ' + str(planet_price) + ' Transaction amount: ' + str(amount))
        return amount

    def get_player(self):
        return self._player
    def get_ship(self):
        return self._ship
    def get_universe(self):
        return self._universe
    def get_difficulty(self):
        return self._difficulty

    def __str__(self):  #mostly for debugging
        builder = ''
        builder += 'Player: ' + str(self._player) + '\n'
        builder += str(self._universe)
        return builder

class Player:
    def __init__(self, attributes, region, money, name):
        self._attributes = {} # attributes is [Pilot, Fighter, Merchant, Engineer] (all ints)
        self._attributes['Pilot'] = attributes[0]
        self._attributes['Fighter'] = attributes[1]
        self._attributes['Merchant'] = attributes[2]
        self._attributes['Engineer'] = attributes[3]
        self._region = region
        self._credits = int(money)
        self._name = name
        self._region_market_adjusted_prices = {}
        self.calculate_market_costs()
        #expect that fuel costs will be updated using the calculate function
        self._fuel_costs = {}

    def transaction(self, monetary_value):
        self._credits += int(monetary_value)

    def calc_fuel_costs(self, region_list, region_distances):   #generate fuel costs with pilot skill
        self._fuel_costs = {}
        for connected_region in region_list:
            self._fuel_costs[connected_region] = fuel_cost_helper(region_distances[connected_region], self._attributes['Pilot'])

    def calculate_market_costs(self):
        self._region_market_adjusted_prices = {}
        for item in self._region.get_market():    #generate the market for the planet the player is on, taking into account merchant skill
            item_key = ('buy_' + item, 'sell_' + item)
            if random.randint(0,1) == 0:
                self._region_market_adjusted_prices[item_key[0]] = item_cost_helper(self._region.get_market()[item], self._attributes['Merchant'])
            else:
                self._region_market_adjusted_prices[item_key[1]] = item_cost_helper(self._region.get_market()[item], self._attributes['Merchant'], buy=False)

    # getters
    def get_region(self):
        return self._region
    def get_region_market_adjusted_prices(self):
        return self._region_market_adjusted_prices
    def get_credits(self):
        return self._credits
    def get_attributes(self):
        return self._attributes
    def get_name(self):
        return self._name
    def get_fuel_costs(self):
        return self._fuel_costs

    # setters
    def set_region(self, region):
        self._region = region
        self.calculate_market_costs()
    def set_credits(self, money):
        self._credits = money

    def __str__(self):
        builder = ''
        builder += 'Player is currently at ' + str(self._region) + '\n'
        builder += 'Player attributes currently are: ' + str(self._attributes)
        return builder

class Ship:
    def __init__(self, ship):
        self._ship_type = ship['name']
        self._max_cargo_space = ship['cargo_space']
        self._max_fuel_capacity = ship['fuel']
        self._max_health = ship['health']

        self._cargo = {}
        self._current_fuel = ship['fuel']
        self._current_health = ship['health']

    def add_cargo(self, item, amount=1):
        if item in self._cargo:
            self._cargo[item] += amount
        else:
            self._cargo[item] = amount
    def remove_cargo(self, item, amount=1):
        self._cargo[item] -= amount
        if self._cargo[item] <= 0:
            del self._cargo[item]   #delete entry if no more item of type

    def remove_fuel(self, amount):
        self._current_fuel -= amount

    def get_type(self):
        return self._ship_type
    def get_max_cargo_space(self):
        return self._max_cargo_space
    def get_max_fuel_capacity(self):
        return self._max_fuel_capacity
    def get_max_health(self):
        return self._max_health
    def get_cargo(self):
        return self._cargo
    def get_current_fuel(self):
        return self._current_fuel
    def get_current_health(self):
        return self._current_health

class Universe:
    __instance = None
    def __init__(self):
        # Needs to be singleton (can't make more than 1)
        if Universe.__instance is not None:
            raise Exception("This class is a singleton!")

        self._game_regions = {} #set of Region types (not strings!!!)
        self._region_distances = None

        for name in PLANET_NAMES:  # add regions to game_regions with random attributes
            valid_coordinates = False
            while not valid_coordinates:
                x_coord = random.randint(-200, 200)
                y_coord = random.randint(-200, 200)

                if not self._game_regions:   #pythonic way of checking that a list is empty
                    valid_coordinates = True

                for planet in self._game_regions:    #make sure regions are sufficiently far apart
                    if abs(self._game_regions[planet].get_coordinates()[0] - x_coord) > 5:
                        if abs(self._game_regions[planet].get_coordinates()[1] - y_coord) > 5:
                            valid_coordinates = True

            tech = random.randint(0, len(TECH_LEVELS) - 1)
            self._game_regions[name] = Region((x_coord, y_coord), TECH_LEVELS[tech], name)

        self._region_distances = RegionDistances(self._game_regions)

    def get_game_regions(self):
        return self._game_regions
    def get_region_distances(self):
        return self._region_distances

    def __str__(self):
        builder = ''
        for planet in self._game_regions:
            builder += str(self._game_regions[planet]) + ' '
        return builder

class Region:
    def __init__(self, coordinates, tech_level, name):
        self._name = name
        self._tech_level = tech_level
        self._coordinates = coordinates
        self._market = {}
        for item in MARKET_ITEMS[tech_level]:   #fetch items available at given tech level
            self._market[item] = random.randint(5, 50)  #map each item to a price

    def get_name(self):
        return self._name
    def get_tech_level(self):
        return self._tech_level
    def get_coordinates(self):
        return self._coordinates
    def get_market(self):
        return self._market

    def __str__(self):
        builder = ''
        builder += self._name + ' at ' + str(self._coordinates)
        return builder

class RegionDistances:  #RegionDistances class to handle fuel costs and distances better
    def __init__(self, region_list):
        self._distances = {}
        for region in region_list:
            for connected_region in region_list:    #going to have 2 way connected node graph for easy lookup
                r1_x, r1_y = region_list[region].get_coordinates()
                r2_x, r2_y = region_list[connected_region].get_coordinates()
                distance = ((r2_x - r1_x)**2 + (r2_y-r1_y)**2)**.5
                self._distances[(region_list[region].get_name(), region_list[connected_region].get_name())] = distance

    def get_distances(self, region):
        distance_set = {}
        for connected_region in PLANET_NAMES:
            distance_set[connected_region] = self._distances[(region, connected_region)]
        return distance_set
