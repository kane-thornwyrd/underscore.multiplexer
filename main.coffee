isAmd = isCommonJs = isBrowser = false

if typeof define is 'function' and define.amd
  isAmd = true
else if typeof exports is 'object' and typeof exports.nodeName isnt 'string'
  isCommonJs = true
else
  isBrowser = true

if isAmd or isCommonJs
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
  inside 'multiplexer', we require "./#{ pkg.main }"
  chai.use sinonChai

if isBrowser
  mocha.setup 'bdd'

getARandomString = -> Math.random().toString(36).replace(/[^a-zA-Z]+/g, '')

chai.should()

# ## Tests made to test the tests…
describe 'TestsTests', ->

  it 'Should success', ->
    true.should.be.equal true

  it 'Should be able to use Sinon spies', ->

    hello = (name, cb)->
      cb "hello " + name

    cb = sinon.spy()

    hello "foo", cb

    cb.should.have.been.calledWith "hello foo"

# ## Real tests !

describe 'Underscore.multiplexer', ->

  it 'Should be registered in Underscore !', ->
    _.multiplexer.should.not.be.equal undefined

  it 'Should call the callback which is passed to it.', ->
    cb = sinon.spy()
    arg = getARandomString()
    _.multiplexer cb, arg
    cb.should.have.been.calledWith arg

  it 'Should call it for each argument after it ! (1 argument = 1 call)', ->
    rng = Math.floor(Math.random() * 20)
    cb = sinon.spy()
    args = [cb]
    args.push getARandomString() for [0..rng-1]
    _.multiplexer.apply @, args
    cb.callCount.should.equal rng

  it 'Should call it for each argument after it ! (each argument is passed to the callback)', ->
    rng = Math.floor(Math.random() * 20)
    cb = sinon.spy()
    args = [cb]
    args.push getARandomString() for [0..rng-1]
    _.multiplexer.apply @, args
    cb.should.have.been.calledWith args[index] for index in [0..rng]

if isBrowser
  mocha.checkLeaks();
  mocha.run()
