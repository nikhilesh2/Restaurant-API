const MenuItem_list = [
   {
        id: '5b1c89ae-c23b-4378-a8a9-27bdcd701cfa',
        menu_id: 'ea33e70e-1207-499e-bbe9-b9ed2323f932',
        type: 'Appetizer',
        name: "Spring Rolls",
        price: 6.95,
        description: "Fried dish containing minced pork, shredded carrot, bean sprouts and other vegetables served with a sauce similar to Worcestershire sauce.",
        isVegan: false,
        isVegetarian: false,
        spicy: '4',
        allergies: [],
    },
    {
        id: '8d939122-5466-454f-8606-a7fa098f9adb',
        menu_id: 'ea33e70e-1207-499e-bbe9-b9ed2323f932',
        name: "Pad Thai",
        price: 11.95,
        description: 'Stir-fried rice noodles with eggs, vegetables and tofu in a sauce of tamarind, fish, dried shrimp, garlic, red chilli pepper and sugar.',
        isVegan: false,
        isVegetarian: false,
        spicy: 6,
        allergies: ['Peanuts'],
    },
    {
        id: '5b892280-9908-4bed-8764-65123034abf7',
        menu_id: 'ea33e70e-1207-499e-bbe9-b9ed2323f932',
        name: "Drunken Noodle",
        price: 11.95,
        description: 'Rice noodles, egg, onions, baby corn, carrots, broccoli, mushrooms, basil and peppers with spicy sauce',
        isVegan: false,
        isVegetarian: true,
        spicy: 8,
        allergies: [],
    },
    {
        id: 'aef19556-cd87-408c-a069-0d71d7b4d6ae',
        menu_id: '41bdd3ce-4b21-4408-adc5-8fbee6484b36',
        type: 'Appetizer',
        name: "Dumplings",
        price: 4.95,
        description: 'Small pieces of dough wrapped around a filling',
        isVegan: false,
        isVegetarian: false,
        spicy: 3,
        allergies: [],
    },
     {
        id: '1af4c3f1-3e1e-4225-8af4-fef8c8ab85d3',
        menu_id: '41bdd3ce-4b21-4408-adc5-8fbee6484b36',
        name: "Sushi Bomb Roll",
        price: 12.95,
        description: 'Uncooked center. Tuna, salmon, white fish, masago, cream cheese, asparagus and avocado',
        isVegan: false,
        isVegetarian: false,
        spicy: '3',
        allergies: [],
    },
    {
        id: '55818458-f33b-47f9-8dad-4cec2ecf903a',
        menu_id: '41bdd3ce-4b21-4408-adc5-8fbee6484b36',
        name: "Super Crunch Roll",
        price: 12.95,
        description: 'Krab, eel, salmon, cream cheese, avocado and asparagus. Baked for extra crunch',
        isVegan: false,
        isVegetarian: false,
        spicy: '1',
        allergies: [],
    },
];

module.exports = {data: MenuItem_list};