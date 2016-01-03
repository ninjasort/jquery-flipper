# jQuery Flipper

A simple way to add a CSS3 flip effect to your content.

## Installation

```
$ bower install jquery-flipper --save
```

In your web page:

<!-- **FOUC NOTE** You can add a `data-flipper` attribute to your element to stop a FOUC from appearing due to style adjustments in the plugin. -->

```html
<html>
<head>
  <title>jQuery Flipper</title>
</head>
<body>
  <section id="myFlipper">
    <!-- There should be two elements inside the flipper -->
    <section class="front"></section>
    <section class="back"></section>
  </section>

  <script src="//code.jquery.com/jquery.js"></script>
  <script src="//code.jquery.com/ui/1.11.2/jquery-ui.min.js"></script>
  <script src="bower_components/jquery-flipper/dist/jquery.flipper.min.js"></script>
  <script>
    $('#myFlipper').flipper({
      rotationType: 'left-slide',
      depth: 1000,
      speed: 0.2
    });
  </script>
</body>
</html>
```

## Options
You can also pass flipper options.

- rotationType [string] the type of rotation (left, right, up, down, left-slide, right-slide)

- event [string, object] this event to bind to
	- “hover”
	- “click”
	- {type: “keydown”, keyCode: 13}

- depth [number] the perspective applied to the element rotation (100 - 1000)

- speed [number] the speed of the rotation (0.1 - 2.0)

## Examples

View the demo [here](http://cameronjroe.github.io/jquery-flipper) or in the demo directory.

