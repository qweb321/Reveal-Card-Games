# Reveal Cards Game / Memorizing Game

## Table of contents

- [Overview](#overview)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)


## Overview

This is a memorizing game, which you flip two cards. If they are matched, the matched cards become visible.
If not, the cards will flip back and be matched again. Each matched successful can get 10 score, and the game will finished if you get 260 score.

## My process

### Built with

- HTML5
- CSS custom properties and animation
- Flexbox
- MVC design
- Javascript
- DOM

### What I learned

#### MVC design

MVC architecture divided program/ application into three parts, controller, modal and view.
In this program, MVC help me easier to read, thinking and also debug.
If I found there is some problem in UI, I will go to the view part to check.

- modal: It saves any data which the program needs, like database.
- view: It is in charge of UI design. We design how the data show to users here.
- controller: It's the program's brain. It will dispatch works between view and modal to display a application for user.

MVC benifits:

- Easier to maintain
- Good for team development
- The structure of program is easier to read

#### Game State

In this program we set five state for the controller. With these controller can know which state is now and what it should do in that state. It's easier to understand which state is now for me and think what I need to do in next step.

#### Fisher-Yates Shuffle

In this project we use a hight efficient and fair way to shuffle.
It will start from last card and exchange with other random position before last card then second last card and finish until the second card exchanged.
