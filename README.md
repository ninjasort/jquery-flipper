# jQuery Flipper

A simple way to add a CSS3 flip effect to your content.

## Getting Started
Download the [production version](https://raw.github.com/cameronjroe/jquery-flipper/master/dist/flipper.min.js) or the [development version](https://raw.github.com/cameronjroe/jquery-flipper/master/dist/flipper.js).

In your web page:

```html
<script src="//code.jquery.com/jquery.js"></script>
<script src="jquery.flipper.min.js"></script>
<section id="myFlipper">
    <!-- You must add the id "flipper-inside" inside your flipper container. -->
    <div id="flipper-inside">
        <!-- There should be two elements in the #flipper-inside. They can have any class or id you choose. -->
        <section class="front"></section>
        <section class="back"></section>
    </div>
</section>
<script>
    $('#myFlipper').flipper({
        rotationType: 'left-slide',
        depth: 1000,
        speed: 0.2
    });
</script>
```

## Options
You can also pass flipper options.

- rotationType [string] the type of rotation (left, right, up, down, left-slide, right-slide)

- depth [number 100 - 1000] the perspective applied to the element rotation

- speed [number 0.1 - 2.0] the speed of the rotation

## Examples
View the demo [here](http://cameronjroe.github.io/jquery-flipper) or in the demo directory.