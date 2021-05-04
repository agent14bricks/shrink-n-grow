namespace SpriteKind {
    export const Banner = SpriteKind.create()
}
function checkIfLost () {
    if (isSpriteTouchingBottom()) {
        game.reset()
    } else {
    	
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (size == 1) {
        mySprite.x += -4
        size += 1
    } else if (size == 2) {
        mySprite.x += -8
        size += 1
    } else if (size == 3) {
        size += 0
    }
})
function checkForGravity () {
    return Gravity_sizes[size - 1]
}
function spawnLives () {
    for (let value of tiles.getTilesByType(assets.tile`myTile9`)) {
        myLife = sprites.create(img`
            . d d . . d d . 
            d 3 3 d d 3 3 d 
            d b b 3 b b 3 d 
            d b b b b b 3 d 
            d b b b b b b d 
            . d b b b b d . 
            . . d b b d . . 
            . . . d d . . . 
            `, SpriteKind.Food)
        tiles.placeOnTile(myLife, value)
        tiles.setTileAt(value, assets.tile`transparency8`)
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (blockSettings.readNumber("savesRemaining") > 0) {
        if (game.ask("You Sure You Want to save?")) {
            blockSettings.writeNumber("x", mySprite.x)
            blockSettings.writeNumber("y", mySprite.y)
            mySprite.say("X: " + convertToText(mySprite.x) + " Y: " + convertToText(mySprite.y) + " Saved Succsesfully", 1000)
            blockSettings.writeNumber("savesRemaining", blockSettings.readNumber("savesRemaining") - 1)
        }
    } else {
        mySprite.say("No More Saves Remain!")
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile13`, function (sprite, location) {
    mySprite.vy = 0 - checkForGravity() / 3
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite) {
        if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
            mySprite.vy = -100
        }
    }
})
function setMySpriteSize () {
    mySprite.setImage(img`
        . . d d d d . . 
        . d b b b b d . 
        . d b b b b d . 
        . d c c c c d . 
        . b b b b b b . 
        d . d d d d . d 
        . . b b b b . . 
        . . b . . b . . 
        `)
    if (size == 1) {
        mySprite.setImage(scaling.scaleHalfX(img`
            . . d d d d . . 
            . d b b b b d . 
            . d b b b b d . 
            . d c c c c d . 
            . b b b b b b . 
            d . d d d d . d 
            . . b b b b . . 
            . . b . . b . . 
            `))
    } else if (size == 2) {
        mySprite.setImage(img`
            . . d d d d . . 
            . d b b b b d . 
            . d b b b b d . 
            . d c c c c d . 
            . b b b b b b . 
            d . d d d d . d 
            . . b b b b . . 
            . . b . . b . . 
            `)
    } else if (size == 3) {
        mySprite.setImage(scaling.scale2x(img`
            . . d d d d . . 
            . d b b b b d . 
            . d b b b b d . 
            . d c c c c d . 
            . b b b b b b . 
            d . d d d d . d 
            . . b b b b . . 
            . . b . . b . . 
            `))
    }
}
function off () {
    for (let value of tiles.getTilesByType(assets.tile`myTile8`)) {
        tiles.setTileAt(value, assets.tile`myTile7`)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile16`, function (sprite, location) {
    blockSettings.clear()
    blockSettings.writeNumber("playing?", 0)
    game.over(true, effects.confetti)
})
function on () {
    for (let value of tiles.getTilesByType(assets.tile`myTile7`)) {
        tiles.setTileAt(value, assets.tile`myTile8`)
    }
}
function spawnEnemies () {
    for (let value of tiles.getTilesByType(assets.tile`myTile6`)) {
        myEnemy = sprites.create(img`
            . . 3 3 d b . . 
            . b b b 3 d b . 
            b d d b c d b 3 
            d 3 c d d b b 3 
            3 b b d d c 3 d 
            3 b d c b d d b 
            . b d c b b b . 
            . . b d 3 3 . . 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(myEnemy, value)
        myEnemy.vy = checkForGravity() / 2
        myEnemy.setBounceOnWall(true)
        tiles.setTileAt(value, assets.tile`transparency8`)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile8`, function (sprite, location) {
    game.reset()
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (size == 1) {
        size += 0
    } else if (size == 2) {
        mySprite.x += 4
        size += -1
    } else if (size == 3) {
        mySprite.x += 8
        size += -1
    }
})
info.onLifeZero(function () {
    game.reset()
})
function SetAYtoGlobal (Sprite2: Sprite) {
    Sprite2.ay = checkForGravity()
}
function checkEnemySpeed () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.vy < 0) {
            value.vy = 0 - checkForGravity() / 2
        } else {
            value.vy = checkForGravity() / 2
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (0 < MAX_LIVES) {
        lives += 1
    } else {
        mySprite.say("Full", 500)
    }
})
function isSpriteTouchingBottom () {
    if (mySprite.bottom >= tiles.tileWidth() * tiles.tilemapRows()) {
        return true
    } else {
        return false
    }
}
function setUpPlayer () {
    mySprite = sprites.create(img`
        . . d d d d . . 
        . d b b b b d . 
        . d b b b b d . 
        . d c c c c d . 
        . b b b b b b . 
        d . d d d d . d 
        . . b b b b . . 
        . . b . . b . . 
        `, SpriteKind.Player)
    scene.cameraFollowSprite(mySprite)
    controller.moveSprite(mySprite, 100, 0)
    info.setLife(2)
    if (blockSettings.exists("x")) {
        mySprite.setPosition(blockSettings.readNumber("x"), blockSettings.readNumber("y"))
    } else {
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile3`)
    }
}
function updateLives () {
    MAX_LIVES = size
    if (lives < MAX_LIVES) {
        info.setLife(lives)
    } else {
        info.setLife(MAX_LIVES)
    }
}
function initLevel () {
    spriteutils.setLifeImage(img`
        . . d d d d . . 
        . d b b b b d . 
        . d b b b b d . 
        . d c c c c d . 
        . b b b b b b . 
        d . d d d d . d 
        . . b b b b . . 
        . . b . . b . . 
        `)
    size = 2
    Gravity_sizes = [125, 300, 600]
    color.setColor(3, color.rgb(189, 168, 185))
    lives = 3
    scene.setBackgroundColor(12)
    scene.setBackgroundImage(img`
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccddddccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccdccdccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccddddccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccc33333cccccccccccccccccccccccccccccc33333cccccccccccccccccccccb3333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccb33333333333333bccc33333cccccccccccccccccccccccccccccc33333cccccccccccccccccccccb3333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc33333333333333333ccc33333cccccccccccccccccccccccccccccc33333cccccccccccccccccccccb3333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc333333333333333333ccc33333bcccccccccccccccccccccccccccccbbbbbcccccccccccccccccccccb3333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccb333333333333333333ccc33333bbccccccccccccccccccccccccccccccccbbccccccccccccccccccccb3333bbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc33333bbbbbbbbbbbbbbbbc33333bbcccccccccccccccccccccccccccccccccbccccccccccccccccccccb3333bbbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc3333bbbbbbbbbbbbbbbbbc33333333333333bcccccccb3333333333bc33333ccb333333333333bcccccb3333bbbcccb333333bcccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc3333bbbbbbbbbbbbbbbbcc3333333333333333ccccc3333333333333c33333cc333333333333333ccccb3333bbbccb333333bccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc33333bbbcccccccccccccc33333333333333333ccc33333333333333c33333cc3333333333333333cccb3333bbbc3333333bcccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc3333333333333333bccccc33333333333333333bcc33333333333333b33333cc33333333333333333ccb3333bbb3333333bbbccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccb33333333333333333bccc33333bbbbbbbb3333bcb3333bbbbbbbbbbb33333bb3333bbbbbbbb33333ccb3333bb3333333bbbbbcccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccb33333333333333333bcc33333bbbbbbbb3333bbb3333bbbbbbbbbbb33333bb3333bbbbbbbbb3333bcb3333b333333bbbbbbccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccb33333333333333333cc33333bbbcbbbb33333bb3333bbbbbbbbbbb33333bb3333bbbbbbbbb3333bbb3333333333bbbbbbcccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccbbbbbbbbbbb33333bc33333bbcccccc33333bb3333bbbbccccccc33333bb3333bbbbccccc3333bbb3333333333bbbbbccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccbbbbbbbbbbb3333bc33333bbcccccc3333bbb3333bbbcccccccc33333bb3333bbbcccccc3333bbb3333b333333bbbcccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccbbbbbbbbb3333bb33333bbcccccc3333bbb3333bbbcccccccc33333bb3333bbbcccccc3333bbb3333bb333333bccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccb3333bb33333bbcccccc3333bbb3333bbbcccccccc33333bb3333bbbcccccc3333bbb3333bbb333333bcccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc33333333333333333333bb33333bbcccccc3333bbb3333bbbcccccccc33333bb3333bbbcccccc3333bbb3333bbbb333333bccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc3333333333333333333bbb33333bbcccccc3333bbb3333bbbcccccccc33333bb3333bbbcccccc3333bbb3333bbbcb333333bcccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc3333333333333333333bbb33333bbcccccc3333bbb3333bbbcccccccc33333bb3333bbbcccccc3333bbb3333bbbccc333333bccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc33333333333333333bbbbb33333bbcccccc3333bbb3333bbbcccccccc33333bb3333bbbcccccc3333bbb3333bbbcccc333333bcccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccbbbbbbbbbbbbbbbbbbccccbbbcccccccccbbbbcccbbbbccccccccccccbbbccccbbbcccccccccbbbbcccbbbbccccccbbbbbcccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccbbbbbbbbbbbbbbbbbcccccbbbccccccccccbbbcccbbbcccccccccccccbbbccccbbbccccccccccbbbcccbbbccccccccbbbbcccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccbbbbbbbbbbbbbbccccccccbccccccccccccccccccccccccccccccccccbccccccccccccccccccccccccccccccccccccbbbcccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccb333ccccccccccccb333bccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccb333bcc33333ccccccccccc33333cc3333bcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccb333bcc333333cccccccccc33333cc3333bcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccb333bcc3333333ccccccccc33333cc3333bcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccb333bcc33333333cccccccc33333bb3333bcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccb333bbc333333333ccccccc33333bbb333bbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccb333bbb3333333333cccccc33333bbb333bbbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccc333bbb33333333333ccccc33333bbb333bbbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbb33333b333333cccc33333bbbbbbbbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccbc33333bb333333ccc33333bbcccccbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bbb33333bcc33333bbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bbbb33333bc33333bbcccddddcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bbccb33333b33333bbccdbbbbdccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bbcccb3333333333bbccdbbbbdccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bbccccb333333333bbccdccccdccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bbcccccb33333333bbccbbbbbbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bbccccccb3333333bbcdcddddcdcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bbcccccccb333333bbcccbbbbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bbcccccccc333333bbcccbccbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bbccccccccc3333bbbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbccccccccccbbbbbbccccccccccccccccccccccccccccccccccccccccccccccccccccccccddddddccccccccccccccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbccccccccccccbbbbccccccccccccccccccccccccccccccccccccccccccccccccccccccddddddddddccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcccccccccccccccbcccccccccccccccccccccccccccccccccccccccccccccccccccccccddbbbbbbddccccccccccccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccddbbbbbbbbddcccccccccccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccddbbbbbbbbddcccccccccccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccddbbbbbbbbddcccccccccccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccddccccccccddcccccccccccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccddccccccccddcccccccccccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbcccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbccccccccccccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccddccddddddddccddcccccccccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccddccddddddddccddcccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccb3333333333333333bcccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbcccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccb3333333333333333333cccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbcccccccccccccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333333333333333333cccccccccccccccccccccccccccccccccccccccccccccbbbccbbbcccccccccccccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccb33333333333333333333cccccccccccccccccccccccccccccccccccccccccccccbbccccbbcccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bbbbbbbbbbbbbbbbbbccb33333333333cccb33333333333bcccc3333bcccccc333bcccccb3333bccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bbbbbbbbbbbbbbbbbccb333333333333ccb33333333333333ccc33333ccccc33333ccccc33333cccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bbbcccccccccccccccb3333333333333cb333333333333333bcc33333cccc333333ccccb3333bcccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bb3333333333333ccc33333333333333b33333333333333333cc33333ccc3333333cccb33333ccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bb3333333333333bcc33333bbbbbbbbbb3333bbbbbbbbb3333bc33333bb33333333bbc33333bbbbcccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bb33333333333333cc3333bbbbbbbbbbb3333bbbbbbbbb3333bb33333bb33333333bbb33333bbbbcccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bb33333333333333cc3333bbbbbbbbbbb3333bbbbbbbbb3333bb33333b333333333bb33333bbbbccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bbccccbbbbb33333bc3333bbbbccccccc3333bbbbccccb3333bb333333333333333b33333bbbbbccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bbccccbbbbb33333bb3333bbbcccccccc3333bbbcccccb3333bb333333333b33333b33333bbbbcccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bbccccbbbbb33333bb3333bbbcccccccc3333bbbcccccb3333bb333333333b3333333333bbbbbcccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc33333bbccccccccc33333bb3333bbbcccccccc33333bbcccccb3333bb33333333bb333333333bbbbbccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc333333333333333333333bb3333bbbcccccccc33333333333333333bb3333333bbb33333333bbbbbcccccccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccb33333333333333333333bb3333bbbccccccccb3333333333333333bb333333bbbb33333333bbbbbcccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccb3333333333333333333bb3333bbbccccccccc333333333333333bbb33333bbbbb3333333bbbbbccccccccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccb33333333333333333bbb3333bbbccccccccccb333333333333bbbbb333bbbbbcb3333bbbbbbcccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbccccbbbccccccccccccbbbbbbbbbbbbbbbccccbbbbccccccbbbbbbccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbccccbbbcccccccccccccbbbbbbbbbbbbbcccccbbbcccccccbbbbbcccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbcccccccccccccccccccccccbbbbbbbbbbcccccccccccccccccbbcccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        `)
    tiles.setSmallTilemap(tilemap`level1`)
    setUpPlayer()
    spawnEnemies()
    spawnLives()
    timer.after(2000, function () {
        scene.setBackgroundImage(img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            `)
    })
}
controller.combos.attachCombo("" + controller.combos.idToString(controller.combos.ID.A) + controller.combos.idToString(controller.combos.ID.B) + controller.combos.idToString(controller.combos.ID.down), function () {
    if (game.ask("Are you sure you want to restart?", "This cannot be undone")) {
        blockSettings.clear()
        blockSettings.writeNumber("playing?", 0)
        game.reset()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
    lives += -1
})
let lives = 0
let MAX_LIVES = 0
let myEnemy: Sprite = null
let myLife: Sprite = null
let Gravity_sizes: number[] = []
let mySprite: Sprite = null
let size = 0
initLevel()
if (blockSettings.readNumber("playing?") == 0) {
    blockSettings.writeNumber("savesRemaining", 10)
    blockSettings.writeNumber("playing?", 1)
}
game.onUpdate(function () {
    info.setScore(blockSettings.readNumber("savesRemaining"))
    SetAYtoGlobal(mySprite)
    checkIfLost()
    setMySpriteSize()
    checkEnemySpeed()
    updateLives()
})
forever(function () {
    on()
    pause(checkForGravity() * 3)
    off()
    pause(checkForGravity() * 3)
})
