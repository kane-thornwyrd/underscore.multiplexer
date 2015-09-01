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

getARandomString = -> Math.random().toString(36).replace(/[^a-zA-Z]+/g, '')

chai.should()


describe 'fakeTest', ->

  it 'should success', ->
    true.should.be.equal true


describe 'sinonChai', ->

  it 'Should be a simple exemple of spy', ->

    hello = (name, cb)->
      cb "hello " + name

    cb = sinon.spy()

    hello "foo", cb

    cb.should.have.been.calledWith "hello foo"
