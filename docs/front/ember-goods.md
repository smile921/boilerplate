# something about emberjs

==========================================================================

## ember decorators
[ember decorators --The Javascript of the Future, Today!](http://ember-decorators.github.io/ember-decorators/latest/)
Ember Decorators is a project dedicated to exploring and unlocking that future. Its goal is to provide a set of decorators which can be used to write native classes with every standard feature that is available in Ember, along with the transforms and build system required to polyfill and ship them in your app today!
`ember install ember-decorators`

This addon doesn't contain any decorators itself, but includes the core set of
subaddons that are necessary to begin writing Ember using native classes:

* `@ember-decorators/component`
* `@ember-decorators/controller`
* `@ember-decorators/data`
* `@ember-decorators/object`
* `@ember-decorators/service`

### Usage in Applications

In your application where you would normally have:

```js
import Ember from 'ember';

export default Ember.Component.extend({
  foo: Ember.inject.service(),

  bar: Ember.computed('someKey', 'otherKey', function() {
    var someKey = this.get('someKey');
    var otherKey = this.get('otherKey');

    return `${someKey} - ${otherKey}`;
  }),

  actions: {
    handleClick() {
      // do stuff
    }
  }
})

```

You replace it with this:

```js
import Component from '@ember/component';
import { action, computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

export default class ExampleComponent extends Component {
  @service foo

  @computed('someKey', 'otherKey')
  get bar() {
    const someKey = this.get('someKey');
    const otherKey = this.get('otherKey');
    return `${someKey} - ${otherKey}`;
  }

  @action
  handleClick() {
    // do stuff
  }
}
```

See the [API Documentation](https://ember-decorators.github.io/ember-decorators)
for detailed examples and documentation of the individual decorators.
