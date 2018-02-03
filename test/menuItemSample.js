const MenuItem_list = [
   {
       id: '5b1c89ae-c23b-4378-a8a9-27bdcd701cfa',
       menu_id: 'ea33e70e-1207-499e-bbe9-b9ed2323f932',
       type: 'Appetizer',
       name: "Spring Rolls",
       price: 6.95,
       description: "Fried dish containing minced pork, shredded carrot, bean sprouts and other vegetables served with a sauce similar to Worcestershire sauce.",
       food_spec: {
            isVegan: false,
            isVegetarian: false,
            spicy: '4',
            allergies: [],
            combos: [],
        }
    },
    {
       id: '8d939122-5466-454f-8606-a7fa098f9adb',
       menu_id: 'ea33e70e-1207-499e-bbe9-b9ed2323f932',
       type: 'Entree',
       name: "Pad Thai",
       price: 11.95,
       description: 'Stir-fried rice noodles with eggs, vegetables and tofu in a sauce of tamarind, fish, dried shrimp, garlic, red chilli pepper and sugar.',
       food_spec: {
            isVegan: false,
            isVegetarian: false,
            spicy: '6',
            allergies: ['Peanuts'],
            combos: [],
        }
    },
    {
       id: 'aef19556-cd87-408c-a069-0d71d7b4d6ae',
       menu_id: '41bdd3ce-4b21-4408-adc5-8fbee6484b36',
       type: 'Appetizer',
       name: "Dumpings",
       price: 4.95,
       description: 'Small pieces of dough wrapped around a filling',
       food_spec: {
            isVegan: false,
            isVegetarian: false,
            spicy: '3',
            combos: [],
        }
    },
];

module.exports = {data: MenuItem_list};