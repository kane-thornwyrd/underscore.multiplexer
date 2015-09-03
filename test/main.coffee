if typeof window is 'undefined'
  inside = (what, from)=>
    if typeof window isnt 'undefined'
      window[what] = from
    else
      global[what] = from
  we = (obj)-> obj
  load = (thing)=> inside thing, we require thing

  inside '_', we require 'underscore'

  load 'chai'
  load 'sinon'
  inside 'sinonChai', we require 'sinon-chai'
  inside 'pkg', we require '../package.json'
  inside 'multiplexer', we require "../#{ pkg.main }"
  chai.use sinonChai

else
  mocha.setup 'bdd'

getARandomString = -> Math.random().toString(36).replace(/[^a-zA-Z]+/g, '')

chai.should()

describe 'fakeTest', ->

  it 'Should success', ->
    true.should.be.equal true

  it 'Should be able to call the fakeFunction', ->
    (typeof fakeFunction).should.equal 'function'

  it 'Should call fakeFunction with an argument which will be returnedd as-is.', ->
    arg = getARandomString();
    fakeFunction(arg).should.be.equal arg

describe 'sinonChai', ->

  it 'Should be a simple exemple of spy', ->

    hello = (name, cb)->
      cb "hello " + name

    cb = sinon.spy()

    hello "foo", cb

    cb.should.have.been.calledWith "hello foo"

if typeof window isnt 'undefined'
  # mocha.checkLeaks();
  mocha.run()
