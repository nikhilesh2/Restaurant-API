const Menu_list = [
   {
      id: 'ea33e70e-1207-499e-bbe9-b9ed2323f932',
      type: "Dinner",
      restaurant_id: 'a322ce50-0860-11e8-8ccd-3b24d794a9b3',
      sections: {
      		"Tempura Rolls": [],
      		"Noodle Dishes": ['8d939122-5466-454f-8606-a7fa098f9adb', '5b892280-9908-4bed-8764-65123034abf7']
      },
      hours: {'Monday': [{'hours_open_start': '16:00', 'hours_open_end': '21:00'}], 'Friday': [{'hours_open_start': '16:00', 'hours_open_end': '21:00'}] }
    },
     {
      id: '41bdd3ce-4b21-4408-adc5-8fbee6484b36',
      type: "Lunch",
      restaurant_id: 'a322ce50-0860-11e8-8ccd-3b24d794a9b3',
      sections: {
      		"Tempura Rolls": ['1af4c3f1-3e1e-4225-8af4-fef8c8ab85d3', '55818458-f33b-47f9-8dad-4cec2ecf903a'],
      		"Noodle Dishes": ['8d939122-5466-454f-8606-a7fa098f9adb', '5b892280-9908-4bed-8764-65123034abf7']
      },
      hours: {'Monday': [{'hours_open_start': '16:00', 'hours_open_end': '21:00'}], 'Friday': [{'hours_open_start': '16:00', 'hours_open_end': '21:00'}] }
    },
];

module.exports = {data: Menu_list};