# Module: Clock

**Developed By:** *[Isaac Robbins](https://github.com/MeAwesome)*

**Last Update:** *11/13/2019*

## Purpose

Display the current time and date on the mirror.

## Images



## Installation

This module comes pre-installed with ReFlect.

## Configuration

Configure this module in the `description.json` file or using the default *controller* module.

| Option        | Description
| ------------- | -----------
| `region`      | The region on the mirror to be displayed. <br><br> **Possible Values:** *Read Mirror > Regions* <br> **Default Value:** `top-left`
| `style`       | Changes how the clock will be rendered. <br><br> **Possible Values:** `digital-classic`, `digital-modern`, `analog-classic`, or `analog-modern` <br> **Default Value:** `digital-classic`
| `timeFormat`  | Displays the time in a `12` or `24` hour format. <br> ***Requires*** `style` ***to be set to*** `digital-classic` ***or*** `digital-modern`***.*** <br><br> **Possible Values:** `12` or `24` <br> **Default Value:** `12`
| `seconds`     | Displays the seconds. <br><br> **Possible Values:** `true` or `false` <br> **Default Value:** `false`
| `periodStyle` | Changes how the period will be shown. <br> ***Requires*** `timeFormat` ***to be set to*** `12`***.*** <br><br> **Possible Values:** `lowercase`, `uppercase`, or `hidden` <br> **Default Value:** `lowercase`
| `theme`       | Changes the color (*and font if using a digital `style`*) of the clock. <br><br> **Possible Values:** *Read clock > themes* <br> **Default Value:** `default`

##
