# jQuery Flipper

A simple way to add a CSS3 flip effect to your content.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/cameronjroe/jquery-flipper/master/dist/flipper.min.js
[max]: https://raw.github.com/cameronjroe/jquery-flipper/master/dist/flipper.js

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

## Documentation
Getting started with jquery-flipper is easy. Simply add `<script src="//code.jquery.com/jquery.js"></script>` to your project and a reference to `<script src="jquery-flipper.min.js"></script>` and you're ready to go! You'll need to create an element that you can target
with jquery and apply the `$('#element').flipper();` function. The html should be structured as is outlined above.

- Options
You can also pass flipper options.
    - rotationType [string] the type of rotation (left, right, up, down, left-slide, right-slide)
    - depth [number 100 - 1000] the perspective applied to the element rotation
    - speed [number 0.1 - 2.0] the speed of the rotation

## Examples
View the demo [here](http://cameronjroe.github.io/jquery-flipper) or in the demo directory.