import random
import math

PLANET_NAMES = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter',
                'Europa', 'Saturn', 'Uranus', 'Neptune', 'Pluto']

TECH_LEVELS = ['PRE-AG', 'AGRICULTURE', 'MEDIEVAL',
               'RENAISSANCE', 'INDUSTRIAL', 'MODERN', 'FUTURISTIC']

CREDITS = {'easy': 2000, 'medium': 1000, 'hard': 500}

SPACESHIP_TYPES = {
    'Starship': {'name': 'Starship', 'cargo_space':50, 'fuel':1000, 'health':15},
    'Jet': {'name': 'Jet', 'cargo_space' : 70, 'fuel': 2000, 'health': 12},
    'Wasp': {'name': 'Wasp', 'cargo_space': 70, 'fuel': 1000, 'health': 20},
    'Ladybug': {'name': 'Ladybug', 'cargo_space': 70, 'fuel': 1200, 'health': 18}
    }

MARKET_ITEMS = {
    'PRE-AG': ['Wood', 'Water', 'Deer', 'Bear', 'Cooked Bear', 'Cooked Deer',
               'Mystery Meat', 'Cooked Mystery Meat', 'Cow', 'Cooked Cow'],
    'AGRICULTURE': ['Wood', 'Water', 'Corn', 'Tomatoes', 'Soybean',
                    'Wheat', 'Sugar', 'Potatoes', 'Walnuts', 'Yams'],
    'MEDIEVAL': ['Water', 'Iron Platebody', 'Iron Full Helm', 'Iron Platelegs',
                 'Iron Plateskirt', 'Iron Sword', 'Steel Platebody', 'Steel Full Helm',
                 'Steel Platelegs', 'Steel Plateskirt', 'Steel Sword'],
    'RENAISSANCE': ['Water', 'Shirt', 'Pants', 'Skirt', 'Ruby', 'Emerald',
                    'Sapphire', 'Necklace', 'Ring', 'Steel Sword'],
    'INDUSTRIAL': ['Shirt', 'Pants', 'Fancy Shirt', 'Fancy Pants', 'Fancy Skirt',
                   'Ruby', 'Emerald', 'Necklace', 'Ring', 'Water'],
    'MODERN': ['Water', 'Computer', 'Phone', 'Laptop', 'Fortnite', 'XBOX',
               'PS4', 'TV', 'Water Bottle', 'Video Game'],
    'FUTURISTIC': ['Computer', 'Phone', 'Laptop', 'Fancy Phone', 'Fancy Laptop', 'Glasses',
                   'Virtual Food', 'Virtual Water', 'Virtual Money', 'Virtual Sword']
    }

#encounter rate is encoded as numbers that can be rolled out of 10. For example,
#on easy difficulty, rolling a 1 will yield a bandit encounter, a 5 will yield
#a police encounter, and 8 or 9 will both yield traders. Higher chances can be
#added by increasing the mappings of numbers from 1-10 that will get that encounter.
#Bandits always start on number 1, Police always start on 5, and Traders always start on 8
#the above information allows for easy testing by changing the random number generator in travel()
#to a fixed number that always produces the start number of the desired encounter
NPC_ENCOUNTER_RATES = {
    'easy': {1: 'Bandits', 5: 'Police', 8: 'Traders', 9: 'Traders'},
    'medium': {1: 'Bandits', 2: 'Bandits', 5: 'Police', 8: 'Traders', 9: 'Traders'},
    'hard': {1: 'Bandits', 2: 'Bandits', 3: 'Bandits', 5: 'Police', 8: 'Traders'}
    }

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
        if self._player.get_region().get_name() == region:
            print('tried to travel to planet player is already at')
            return
        old_region = self._player.get_region()
        old_market = self._player.get_region_market_adjusted_prices()
        cost = self._player.get_fuel_costs()[region]
        self._player.get_ship().remove_fuel(cost)
        self._player.set_region(self._universe.get_game_regions()[region])
        player_region_name = self._player.get_region().get_name()
        distances = self._universe.get_region_distances().get_distances(player_region_name)
        self._player.calc_fuel_costs(PLANET_NAMES, distances)

        #encounter_roll determines the NPC you will get (if applicable)
        #you can test individual encounters by setting it to:
        #1 for bandits, 5 for police, 8 for traders
        #when set to those, you will get an encounter of that type on every travel
        encounter_roll = random.randint(1, 10)
        #encounter_roll = 1 #uncomment to test a specific roll. remember to comment out when done
        encounter = NPC_ENCOUNTER_RATES[self._difficulty].get(encounter_roll)
        print(encounter_roll, encounter)
        if encounter == 'Bandits':
            self._player.set_encounter(BanditEncounter(old_region, old_market))
            print('bandit encountered')
        elif encounter == 'Traders':
            self._player.set_encounter(TraderEncounter())
            print('trader encountered')
        elif encounter == 'Police' and self._player.get_ship().get_current_cargo():
            print('police encountered')
            contra_name = random.choice(list(self._player.get_ship().get_cargo().keys()))
            print('contraband:', contra_name)
            contra_am = math.ceil(self._player.get_ship().get_cargo()[contra_name]['quantity'] / 2.)
            contraband = {'item': contra_name, 'amount': contra_am}
            self._player.set_encounter(PoliceEncounter(old_region, old_market, contraband))


    # travel for free!
    def free_travel(self, region):
        if self._player.get_region().get_name() == region:
            print('tried to travel to planet player is already at')
            return
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

    #do (action) with NPC. Will return 'illegal' if action if not allowed
    def encounter_action(self, action):
        encounter = self._player.get_encounter()
        if encounter is None or action not in encounter.get_json()['actions']:
            return 'illegal'
        done, message = self._player.encounter_action(action)
        if done:
            self._player.set_encounter(None)
        player_region_name = self._player.get_region().get_name()
        distances = self._universe.get_region_distances().get_distances(player_region_name)
        self._player.calc_fuel_costs(PLANET_NAMES, distances)
        return message

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
        self._encounter = None

    def transaction(self, monetary_value):
        self._credits += int(monetary_value)

    def calc_fuel_costs(self, region_list, region_distances):  #generate fuel costs with pilot skill
        self._fuel_costs = {}
        for conn_region in region_list:
            self._fuel_costs[conn_region] = fuel_cost_helper(region_distances[conn_region],
                                                             self._attributes['Pilot'])

    def calculate_market_costs(self, single_item=None, buy=True, amount=0):
        if single_item is not None:
            if buy:
                item_container = self._region_market_adjusted_prices[single_item]
                quantity = int(item_container['quantity']) - int(amount)
                price = item_cost_helper(self._region.get_market()[single_item], quantity,
                                         self._attributes['Merchant'])
                self._region_market_adjusted_prices[single_item] = {'buy' : price,
                                                                    'sell' : price,
                                                                    'quantity' : quantity}
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
                quantity = random.randint(0, 100)
                price = item_cost_helper(self._region.get_market()[item], quantity,
                                         self._attributes['Merchant'])
                self._region_market_adjusted_prices[item] = {'buy' : price,
                                                             'sell' : price,
                                                             'quantity' : quantity}
                self._ship.update_price(item, price)
            for item, price in self._ship.get_cargo().items():
                if not item in self._region_market_adjusted_prices:
                    quantity = 0
                    price = item_cost_helper(random.randint(10, 50), quantity,
                                             self._attributes['Merchant'],
                                             buy=False)
                    self._ship.update_price(item, price)

    #interact with the NPC encounter. returns True if the encounter is ended as a result
    #look at the encounter classes to see what happens in each encounter and what is returned when
    #an action is taken.
    def encounter_action(self, action):
        encounter_type = self._encounter.get_json()['type']
        damage_amount = -5 #change this number to balance the game
        message = 'unrecognized action'
        done = False #represents whether the encounter is over

        #all actions associated with the bandit encounter
        if encounter_type == 'Bandits':
            if action == 'pay':
                done = True
                success, credit_change = self._encounter.pay(self._credits)
                if success:
                    message = 'Successfully paid bandits'
                    self._credits -= credit_change
                else:
                    if self._ship.get_cargo():
                        message = 'Failed to pay the bandits and bandits took cargo'
                        self._ship.remove_all_cargo()
                    else:
                        message = 'Failed to pay the bandits and ship took damage'
                        self._ship.update_health(damage_amount)

            elif action == 'flee':
                done = True
                success, dest, old_market = self._encounter.flee(self._attributes['Pilot'])
                self._region = dest
                self._region_market_adjusted_prices = old_market

                message = 'Returned back to origin successfully'
                if not success:
                    message = 'Failed to flee. Bandits stole credits and ship took damage'
                    self._credits = 0
                    self._ship.update_health(damage_amount)

            elif action == 'fight':
                done = True
                success, credit_change = self._encounter.fight(self._attributes['Fighter'])
                if success:
                    message = 'Fought off the bandits and stole their money'
                    self._credits += credit_change
                else:
                    message = 'Failed to fight off the bandits. Bandits stole credits ' \
                              'and ship took damage'
                    self._credits = 0
                    self._ship.update_health(damage_amount)

        #all actions associated with the trader encounter
        elif encounter_type == 'Trader':
            # no check for enough inventory space
            price = 25 #just some random amount for add_cargo(). probably should change to a random
            goods_price = self._encounter.get_goods_price()
            if action == 'buy':
                if self._credits > goods_price:
                    done = True
                    message = 'Bought the goods off the trader'
                    self._credits -= goods_price
                    item, amount = self._encounter.buy()
                    self._ship.add_cargo(item, amount, price)
                else:
                    message = 'Didn\'t have enough credits to buy from the trader.'
                    done = False

            elif action == 'ignore':
                done = True
                message = 'Ignored the trader and moved on to destination'

            elif action == 'rob':
                done = True
                success, item, amount = self._encounter.rob(self._attributes['Fighter'])
                if success:
                    message = 'Successfully robbed the trader. Stole their goods as a reward'
                    self._ship.add_cargo(item, amount, price)
                else:
                    message = 'Failed to rob the trader. Ship took damage'
                    self._ship.update_health(damage_amount)

            elif action == 'negotiate':
                done = False
                message = 'Attempted to negotiate with the trader'
                self._encounter.negotiate(self._attributes['Merchant'])

        #all actions associated with the police encounter
        elif encounter_type == 'Police':
            if action == 'forfeit':
                done = True
                message = 'Gave up the contraband and moved to destination'
                item, amount = self._encounter.forfeit()
                self._ship.remove_cargo(item, amount)

            elif action == 'flee':
                done = True
                success, item, num, des, o_m, fine = self._encounter.flee(self._attributes['Pilot'])
                self._region = des
                self._region_market_adjusted_prices = o_m
                message = 'Got back to origin successfully'
                if not success:
                    message = 'Failed to flee. Police took contraband, ship took damage, ' \
                              'and fined for evading'
                    self._ship.remove_cargo(item, num)
                    self._ship.update_health(damage_amount)
                    self._credits = max(self._credits - fine, 0)

            elif action == 'fight':
                done = True
                success, item, num, des, o_m, fine = self._encounter.flee(self._attributes['Pilot'])
                message = 'Successfully fought off the police'
                if not success:
                    message = 'Failed to fight off the police. Police took contraband, ' \
                              'ship took damage, and fined for evading'
                    self._region = des
                    self._region_market_adjusted_prices = o_m
                    self._ship.remove_cargo(item, num)
                    self._ship.update_health(damage_amount)
                    self._credits = max(self._credits - fine, 0)

        return (done, message) #do nothing on unrecognized action


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
    def get_encounter(self):
        return self._encounter

    # setters
    def set_region(self, region):
        self._region = region
        self.calculate_market_costs()
    def set_credits(self, money):
        self._credits = money
    def set_encounter(self, encounter):
        self._encounter = encounter

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
        self._current_value += (self._cargo[item]['price'] * amount)

    def remove_cargo(self, item, amount=1):
        self._cargo[item]['quantity'] -= amount
        price = self._cargo[item]['price']
        if self._cargo[item]['quantity'] <= 0:
            del self._cargo[item]   #delete entry if no more item of type

        self._current_cargo -= amount
        self._current_value -= price * amount

    def remove_fuel(self, amount):
        self._current_fuel -= amount
        self._current_value -= amount

    def update_price(self, item, price):
        if item in self._cargo:
            item_quantity = self._cargo[item]['quantity']
            self._current_value += item_quantity * (price - self._cargo[item]['price'])
            print(self._cargo[item]['quantity'] * (price - self._cargo[item]['price']))
            self._cargo[item]['price'] = price

    def update_health(self, amount):
        self._current_health += amount

    def remove_all_cargo(self): #basically a setter but more limited
        self._cargo = {}
        self._current_cargo = 0
        self._current_value = self._current_fuel + self._current_health

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

#very messy code to handle the encounters of the game
#Encounter classes all have the property get_json()
#besides that they have different constructors and functions so no base class was made
#be very careful when editing and make sure you pay attention to the implementation in Player.
#all actions have a comment next to them on each outcome and what it means in plain english
class BanditEncounter: #options are to pay, flee, or fight
    def __init__(self, old_region, old_region_market):
        self.old_region = old_region #store previous region info so player can return
        self.old_region_market = old_region_market #again, for restoring
        self.cost = random.randint(500, 1000) #cost to escape and amount rewarded on fighting

    def pay(self, money): #returns (success, credit change)
        if money > self.cost: #success, no modification
            return (True, self.cost)
        return (False, 0) #failure, player didn't have enough and will take damage

    def flee(self, pilot): #returns (success, where to go, market)
        if random.randint(0, 10) < pilot: #success, go back to region
            return (True, self.old_region, self.old_region_market)
        return (False, self.old_region, self.old_region_market) #failure, go back damaged

    def fight(self, fighter): #returns (success, credit change)
        if random.randint(0, 10) < fighter: #success, get bandit's money
            return (True, self.cost)
        return (False, 0) #failure, don't get any money and go back damaged

    def get_json(self):
        json = {
            'type': 'Bandits',
            'cost': self.cost,
            'actions': ['pay', 'flee', 'fight']
        }
        return json

class TraderEncounter: #options are buy, ignore, rob, or negotiate. ignore is implemented in player
    def __init__(self):
        self.goods = {'item': random.choice(MARKET_ITEMS[random.choice(TECH_LEVELS)]),
                      'quantity': random.randint(3, 6),
                      'price': random.randint(60, 180)}
        self.negotiated = False

    def buy(self):
        return (self.goods['item'], self.goods['quantity']) #pretty simple, player buys the stuff

    def rob(self, fighter):
        if random.randint(0, 10) < fighter: #success, get some of the goods
            return (True, self.goods['item'], self.goods['quantity'] // 2 + 1)
        return (False, None, 0) #failure, don't get anything and get damaged

    def negotiate(self, merchant):
        if not self.negotiated: #can only be attempted once
            if random.randint(0, 10) < merchant: #success, lower prices
                self.goods['price'] = self.goods['price'] // 3
            else: #failure, raise prices
                self.goods['price'] = self.goods['price'] * 3
            self.negotiated = True

    def get_goods_price(self):
        return self.goods['price']

    def get_json(self):
        json = {
            'type': 'Trader',
            'goods': self.goods,
            'negotiated': self.negotiated,
            'actions': ['buy', 'ignore', 'rob', 'negotiate']
        }
        return json

class PoliceEncounter: #options are forfeit, flee, fight.
    def __init__(self, old_region, old_region_market, identified_goods):
        self.contraband = identified_goods #form of {'item': name, 'amount': #}
        self.old_region = old_region
        self.old_region_market = old_region_market

    def forfeit(self):
        return (self.contraband['item'], self.contraband['amount']) #player just gives up the item

    def flee(self, pilot):
        fine = random.randint(500, 1000)
        old_region = self.old_region #for pylint
        orm = self.old_region_market #for pylint
        if random.randint(0, 10) < pilot: #success, don't loss anything but go back to old region
            return (True, None, 0, self.old_region, orm, 0)
        #on failure, seize items, return to old region, and take fine.
        return (False, self.contraband['item'], self.contraband['amount'], old_region, orm, fine)

    def fight(self, fighter):
        fine = random.randint(500, 1000)
        if random.randint(0, 10) < fighter: #success, travel to region and keep items
            return (True, None, 0, None, 0)
        #on failure, seize items, return to old region, and take fine.
        old_region = self.old_region #for pylint
        orm = self.old_region_market #for pylint
        return (False, self.contraband['item'], self.contraband['amount'], old_region, orm, fine)

    def get_json(self):
        json = {
            'type': 'Police',
            'identified_goods': self.contraband,
            'actions': ['forfeit', 'flee', 'fight']
        }
        return json
