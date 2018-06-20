module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [{
      postDate: new Date(),
      taskId: '958528',
      taskRequestedByName: 'Hannah Redler',
      taskRequestedById: '',
      taskAcceptedById: '',
      status: 'confirmed',
      title: 'Help with writing an actually functioning app',
      description: `Seeking talented developers to make sense of, and help build my Codeworks solo project.`,
      time: 240,
      picture: 'hannah.jpg',
    /*   location: [41.3784, 2.1925], */
    },
    {
      postDate: new Date(),
      taskId: '958529',
      taskRequestedByName: 'Little Red Riding Hood',
      taskRequestedById: '',
      taskAcceptedById: '',
      status: 'pending',
      title: 'Pls kill the wolf xoxo',
      description: 'Need to visit grandma, but the way is blocked by a big bad wolf. When come, bring rocket launcher!',
      time: 115,
      picture: 'red.jpg',
     /*  location: [41.4145, 2.1527], */
    }, 
    {
      postDate: new Date(),
      taskId: '958530',
      taskRequestedByName: 'Jill Jiggles',
      taskRequestedById: '',
      taskAcceptedById: '',
      status: 'confirmed',
      title: 'Fix my computer',
      description: `YES, ACTUALLY I HAVE ALREADY TRIED TURNING IT OFF AND ON AGAIN. SEND HELP!!!`,
      time: 122,
      picture: 'jill.jpg',
      /* location: [41.3809, 2.1228], */
    },
    {
      postDate: new Date(),
      taskId: '958531',
      taskRequestedByName: 'Jane Doe',
      taskRequestedById: '',
      taskAcceptedById: '',
      status: 'submitted',
      title: 'Want to learn how to cook',
      description: `Seeking a chef to teach me home cooking. Last time I tried, I burned a few houses down - therefore, must have a sense of adventure!`,
      time: 69,
      picture: 'jane.jpg',
     /*  location: [41.2974, 2.0833], */
    },
    {
      postDate: new Date(),
      taskId: '9585832',
      taskRequestedByName: 'John Doe',
      taskRequestedById: '',
      taskAcceptedById: '',
      status: 'confirmed',
      title: 'Find out my real identity',
      description: `I am utterly lost and have no idea who I am anymore. If you are a detective or psychic - I implore you, let's figure this thing out`,
      time: 80,
      picture: 'john.jpg',
     /*  location: [41.3977,  2.1911], */
    },
    {
      postDate: new Date(),
      taskId: '958533',
      taskRequestedByName: 'Doe Doe',
      taskRequestedById: '',
      taskAcceptedById: '',
      status: 'pending',
      title: 'Learn yoga',
      description: `Badly out of shape middle-aged, morally corrupt banker seeks enlightenment and a six pack.`,
      time: 50,
      picture: 'doe.jpg',
     /*  location: [41.3561, 2.1499], */
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};