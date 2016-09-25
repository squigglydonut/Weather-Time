'use strict'
const firstOfEntityRole = function(message, entity, role) {
  role = role || 'generic';

  const slots = message.slots
  const entityValues = message.slots[entity]
  const valsForRole = entityValues ? entityValues.values_by_role[role] : null

  return valsForRole ? valsForRole[0] : null
}

exports.handle = function handle(client) {

  const sayHello = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().helloSent)
    },

    prompt() {
      client.addTextResponse('Hello world!')
      client.addTextResponse('I don\'t know much yet, but if you need some pointers on where to get started you should check out the docs – http://docs.init.ai/?key=c0fb-addc-119f')
      client.addTextResponse('Otherwise, head over to Teach (up at the top) and start teaching me!')
      client.updateConversationState({
        helloSent: true
      })
      client.done()
    }
  })

  const untrained = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addTextResponse('Apologies, but this app needs to go back to school!')
      client.done()
    }
  })

  const collectCity = client.createStep({
  satisfied() {
    return Boolean(client.getConversationState().weatherCity)
  },

  prompt() {
    // Need to prompt user for city    
    console.log('Need to ask user for city')
    client.done()
  },
})

const provideWeather = client.createStep({
  satisfied() {
    return false
  },

  prompt() {
    // Need to provide weather
    client.done()
  },
})

    const provideWeather = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      // Need to provide weather
      client.done()
    },
  



  



  client.runFlow({
    classifications: {
			// map inbound message classifications to names of streams
    },
    //autoResponses: {
      // configure responses to be automatically sent as predicted by the machine learning model
    //},
    streams: {
      main: 'getWeather',
      hi: [sayHello],
      getWeather: [collectCity, provideWeather],
    }
  })
}
