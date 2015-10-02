# Contributing

## CSS

Author: Phil Linnell

**"Write CSS, not SASS (well... unless absolutely necessary)"**

The purpose of this document is to suggest some guidelines that will make the styling codebase simple, readable, consistent and relatively transferable to other CSS pre/post-processor languages.

Approach writing the code with a 'vanilla CSS' ethos, only adding non-standard syntax (SASS or perhaps PostCSS in the future) when absolutely necessary.

#### Comments

With this approach in mind use CSS comments `/* ... */` and not SASS `//`.

Each CSS file should have the following at the top:

```
/*
 *  COMPONENT NAME
 *  Short description of the component
 *
 *  Notes: Anything unusual or complicated to mention
 *  TODO:
 */
```

#### Attribute order

To me, there is a familiar and natural order of how to write an element's attributes when I consider a) how a node is drawn and painted in the browser and b) the order of thought process when constructing the style of an element, e.g. dimensions and the space it occupies is thought of before the behaviour of text inside it.

- **content, clear, browser specific rules** - Unusual rules, flags, resets?
- **position, top, right, bottom, left**  - Position is a naughty (but helpful) rule, can remove element from the flow
- **display, flex properties, float**  - How the element behaves in the flow, the element flavour
- **width, height, margin, padding** - Box Model, dimensions
- **border, border-radius, background** - Cosmetics of the box
- **color, font, line-height, text** - Text and innards behaviour (leaves)
- **transform, opacity, visibility** - Modify the element
- **transition, animation** - Motion

#### Media queries

Write media queries at the bottom of the component file, each one outside of the component selector name
```
@media screen and (min-width: $breakpoint) {
  .component-name {
    ...
  }
}
```
Note: Use `@mixin` and standard CSS as much as possible here, no mixins unless necessary.

### SASS

Three very useful, arguably unavoidable CSS extensions:

#### Import

Simply import all scss partials into the main file `@import "path-to-component-name"`

#### Nesting

Try to avoid anything more than a selector nested within an already nested selector (three selectors deep).
```
.component-name {
  padding: 20px;

  .element {
    font-size: 16px;

    span {
      font-weight: bold;
    }
  }
}
```

#### SASS Variables

All variables used within a component should be scoped inside the main selector (thus simple naming conventions can be used). For global variables, define them inside the global variables file.
```
/* _variables.scss */
$header-height: 70px;

/* _component-name.scss */
.component-name {
  $height: $header-height;
  $gutter: 20px;

  height: $height;

  .element {
    padding: 0 $gutter;
  }
}
```
Move to PostCSS's custom-properties and `var()`?

### Advanced SASS

#### Mixins and Extends

Know to use mixins only if an argument is being passed in. Try to limit the amount of 'static' code (can that code be used as an extend instead?). Include the mixin or extend at the top of the attribute stack with spcace underneath before the first attribute.

```
/* mixins.scss */
@mixin mixin-name(argument) {
  color: argument;
}

/* component */
.component {
  @include mixin-name(red);

  width: 50%;
  border: 1px solid;
}
```

#### Loops, iterations etc

If you need them, go bananas.
