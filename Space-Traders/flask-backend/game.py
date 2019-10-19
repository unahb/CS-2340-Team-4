import random
import math

PLANET_NAMES = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter',
                'Europa', 'Saturn', 'Uranus', 'Neptune', 'Pluto']

TECH_LEVELS = ['PRE-AG', 'AGRICULTURE', 'MEDIEVAL',
               'RENAISSANCE', 'INDUSTRIAL', 'MODERN', 'FUTURISTIC']

CREDITS = {'easy': 2000, 'medium': 1000, 'hard': 500}

SPACESHIP_TYPES = {'Starship' : {'name': 'Starship', 'cargo_space':50, 'fuel':1000, 'health':15},
                   'Jet' : {'name': 'Jet', 'cargo_space' : 70, 'fuel': 2000, 'health': 12},
                   'Wasp' : {'name': 'Wasp', 'cargo_space': 70, 'fuel': 1000, 'health': 20},
                   'Ladybug' : {'name': 'Ladybug', 'cargo_space': 70, 'fuel': 1200, 'health': 18}}

MARKET_ITEMS = {'PRE-AG' : ['Wood', 'Water', 'Deer', 'Bear', 'Cooked Bear', 'Cooked Deer',
                            'Mystery Meat', 'Cooked Mystery Meat', 'Cow', 'Cooked Cow'],
                'AGRICULTURE' : ['Wood', 'Water', 'Corn', 'Tomatoes', 'Soybean',
                                 'Wheat', 'Sugar', 'Potatoes', 'Walnuts', 'Yams'],
                'MEDIEVAL' : ['Water', 'Iron Platebody', 'Iron Full Helm', 'Iron Platelegs',
                              'Iron Plateskirt', 'Iron Sword', 'Steel Platebody', 'Steel Full Helm',
                              'Steel Platelegs', 'Steel Plateskirt', 'Steel Sword'],
                'RENAISSANCE' : ['Water', 'Shirt', 'Pants', 'Skirt', 'Ruby', 'Emerald',
                                 'Sapphire', 'Necklace', 'Ring', 'Steel Sword'],
                'INDUSTRIAL' : ['Shirt', 'Pants', 'Fancy Shirt', 'Fancy Pants', 'Fancy Skirt',
                                'Ruby', 'Emerald', 'Necklace', 'Ring', 'Water'],
                'MODERN' : ['Water', 'Computer', 'Phone', 'Laptop', 'Fortnite', 'XBOX',
                            'PS4', 'TV', 'Water Bottle', 'Video Game'],
                'FUTURISTIC' : ['Computer', 'Phone', 'Laptop', 'Fancy Phone', 'Fancy Laptop',
                                'Glasses', 'Virtual Food', 'Virtual Water', 'Virtual Money',
                                'Virtual Sword']}

def fuel_cost_helper(distance, pilot_attribute):
    pilot_attribute += 2
    return int(distance / (1 + math.log(pilot_attribute)))

def item_cost_helper(base_cost, merchant_attribute, quantity, buy=True):
    merchant_attribute += 2
    if buy:
        multiplier = 1.5 - quantity/100
        return int(multiplier * (base_cost / (1 + math.log(merchant_attribute))))
    mult = 1.0 - quantity/100
    return int(mult * (base_cost * math.log(merchant_attribute) * 1.1))

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
        player_region_name = self._player.get_region().get_name()
        distances = self._universe.get_region_distances().get_distances(player_region_name)
        self._player.calc_fuel_costs(PLANET_NAMES, distances)

        print('New game initialized with player starting at ', self._player.get_region())
        print('Universe Configuration: ', str(self._universe))

    def travel(self, region):   #travel when the api is called to do so. fuel costs subtracted
        cost = self._player.get_fuel_costs()[region]
        self._player.get_ship().remove_fuel(cost)
        self._player.set_region(self._universe.get_game_regions()[region])
        player_region_name = self._player.get_region().get_name()
        distances = self._universe.get_region_distances().get_distances(player_region_name)
        self._player.calc_fuel_costs(PLANET_NAMES, distances)

    #buy/sell when api asks to. item is added to ship and credits subtracted
    def transaction(self, region, item, item_amount, buy=True):
        if buy:
            planet_price = self._player.get_region_market_adjusted_prices()[item]['buy']
            amount = planet_price * int(item_amount)
            self._player.transaction(amount*-1)
            self._player.get_ship().add_cargo(item, int(item_amount), planet_price)
            self._player.calculate_market_costs(single_item=item, amount=item_amount)
        else:
            if item in self._player.get_region_market_adjusted_prices():
                planet_price = self._player.get_region_market_adjusted_prices()[item]['sell']
                amount = planet_price * int(item_amount)
                self._player.transaction(amount)
                self._player.get_ship().remove_cargo(item, int(item_amount))
                self._player.calculate_market_costs(single_item=item, buy=False)
            else:   #for when selling from cargo
                planet_price = self._player.get_ship().get_cargo()[item]['price']
                amount = planet_price * int(item_amount)
                self._player.transaction(amount)
                self._player.get_ship().remove_cargo(item, int(item_amount))
                self._player.calculate_market_costs(single_item=item, buy=False)

        print('Successful transaction of ' + str(item_amount) + ' ' + item + ' on ' + region)
        print('Planet item price: ' + str(planet_price) + ' Transaction amount: ' + str(amount))
        return amount

    def get_player(self):
        return self._player
    def get_ship(self):
        return self._player.get_ship()
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
        self._ship = Ship(SPACESHIP_TYPES['Starship'])
        self._region_market_adjusted_prices = {}
        self.calculate_market_costs()
        #expect that fuel costs will be updated using the calculate function
        self._fuel_costs = {}

    def transaction(self, monetary_value):
        self._credits += int(monetary_value)

    def calc_fuel_costs(self, region_list, region_distances):  #generate fuel costs with pilot skill
        self._fuel_costs = {}
        for conn_region in region_list:
            self._fuel_costs[conn_region] = fuel_cost_helper(region_distances[conn_region],
                                                             self._attributes['Pilot'])

    def calculate_market_costs(self, single_item=None, buy=True, amount=0):
        if not single_item == None:
            if buy:
                quantity = int(self._region_market_adjusted_prices[single_item]['quantity']) - int(amount)
                price = item_cost_helper(self._region.get_market()[single_item], quantity, self._attributes['Merchant'])
                self._region_market_adjusted_prices[single_item] = {'buy' : price, 'sell' : price, 'quantity' : quantity}
                self._ship.update_price(single_item, price)
            else:
                quantity = 0
                price = item_cost_helper(random.randint(10, 50), 0, self._attributes['Merchant'],
                                         buy=False)
                self._ship.update_price(single_item, price) 
        else:
            self._region_market_adjusted_prices = {}
            #generate the market for the planet the player is on, taking into account merchant skill
            for item in self._region.get_market():
                quantity = random.randint(0,100)
                price = item_cost_helper(self._region.get_market()[item], quantity, self._attributes['Merchant'])
                self._region_market_adjusted_prices[item] = {'buy' : price, 'sell' : price, 'quantity' : quantity}
                self._ship.update_price(item, price)
            for item, price in self._ship.get_cargo().items():
                if not item in self._region_market_adjusted_prices:
                    quantity = 0
                    price = item_cost_helper(random.randint(10, 50), quantity,
                                             self._attributes['Merchant'],
                                             buy=False)
                    self._ship.update_price(item, price)

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
    def get_ship(self):
        return self._ship
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

        self._cargo = {}
        self._current_fuel = ship['fuel']
        self._current_health = ship['health']
        self._current_cargo = 0
        # ship value calculated using fuel + health + cargo value
        self._current_value = self._current_fuel + self._current_health

    def add_cargo(self, item, amount=1, price=0):
        if item in self._cargo:
            self._cargo[item]['quantity'] += amount
        else:
            self._cargo[item] = {}
            self._cargo[item]['quantity'] = amount
            self._cargo[item]['price'] = price

        self._current_cargo += amount
        self._current_value += (price * amount)

    def remove_cargo(self, item, amount=1):
        self._cargo[item]['quantity'] -= amount
        if self._cargo[item]['quantity'] <= 0:
            del self._cargo[item]   #delete entry if no more item of type

        self._current_cargo -= amount
        self._current_value -= (self._cargo[item]['price'] * amount)

    def remove_fuel(self, amount):
        self._current_fuel -= amount
        self._current_value -= amount

    def update_price(self, item, price):
        if item in self._cargo:
            self._cargo[item]['price'] = price
            self._current_value += self._cargo[item]['quantity'] * (price - self._cargo[item]['price'])

    def get_type(self):
        return self._ship_type
    def get_max_cargo_space(self):
        return SPACESHIP_TYPES[self._ship_type]['cargo_space']
    def get_max_fuel_capacity(self):
        return SPACESHIP_TYPES[self._ship_type]['fuel']
    def get_max_health(self):
        return SPACESHIP_TYPES[self._ship_type]['health']
    def get_cargo(self):
        return self._cargo
    def get_current_fuel(self):
        return self._current_fuel
    def get_current_health(self):
        return self._current_health
    def get_current_cargo(self):
        return self._current_cargo
    def get_current_value(self):
        return self._current_value

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
                    if abs(self._game_regions[planet].get_coordinates()[0] - x_coord) > 8:
                        if abs(self._game_regions[planet].get_coordinates()[1] - y_coord) > 8:
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
            #going to have 2 way connected node graph for easy lookup
            for connected_region in region_list:
                r1_x, r1_y = region_list[region].get_coordinates()
                r2_x, r2_y = region_list[connected_region].get_coordinates()
                distance = ((r2_x - r1_x)**2 + (r2_y-r1_y)**2)**.5
                region_name = region_list[region].get_name()
                connected_region_name = region_list[connected_region].get_name()
                self._distances[(region_name, connected_region_name)] = distance

    def get_distances(self, region):
        distance_set = {}
        for connected_region in PLANET_NAMES:
            distance_set[connected_region] = self._distances[(region, connected_region)]
        return distance_set

    def get_all_distances(self):
        return self._distances
