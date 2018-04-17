const MIN_A = 6;
const MAX_A = 9;
const MIN_AB = 11;
const MAX_AB = 14;
const MIN_B = MIN_AB - MIN_A;
const SEGMENT_WIDTH = 38.5;
const SCALE_TOP = 75;
const ARROW_CPY = -40;
const ARROW_HEIGHT_FACTOR = 10;
const LEFT_A = 15;
const LEFT_B = 22.5;
const state = {};

function init() {

    const { a, b, ab } = generateTerms();
    state.a = a;
    state.b = b;
    state.ab = ab;
    $('#term-a').text(a);
    $('#term-b').text(b);

    prepareA(a, b);
}

function prepareA(a, b) {
    const $input = $('.a');

    drawArrow(1, (a + 1) / 2, a - MIN_A, a + 1);
    prepareInputA(a);
    $input.focus();

    $input.on('change', () => {
        $('#aContainer').removeClass('wrong-answer');
        if (a === Number($input.val())) {
            $input.css({ color: 'green', border: 'none'});
            $input.prop('disabled', true);

            prepareB(b, a);
            prepareInputB(b);

            $input.off('change');
            $('.b').focus()
        } else {
            $input.addClass('wrong-introduced-answer');
            $('#aContainer').addClass('wrong-answer');
        }
    })
}

function prepareB(b, a) {
    const $input = $('.b');

    drawArrow(a + 1, a + 1 + b / 2, b - MIN_B, a + b + 1);
    prepareInputB(b, a);

    $input.on('change', () => {
        $('#bContainer').removeClass('wrong-answer');

        if (b === Number($input.val())) {
            $input.css({ color: 'green', border: 'none' });
            $input.prop('disabled', true);

            const summ = $('.summ');
            summ.removeAttr('value');
            summ.removeAttr('disabled');
            summ.css({ border: '3px solid black' });
            summ.focus();

            summ.on('change', () => {
                summ.removeClass('wrong-introduced-answer');

                if (state.ab === Number(summ.val())) {
                    summ.css({ color: 'green', border: 'none' });
                    summ.prop('disabled', true);
                    summ.blur();

                    //можно сразу генерировать следующую задачу
                    // location.reload();

                } else {
                    summ.addClass('wrong-introduced-answer');
                }
            });
        } else {
            $input.addClass('wrong-introduced-answer');
            $('#bContainer').addClass('wrong-answer')
        }
    })
}

function prepareInputA(a) {
    const $input = $('.a');

    $input.css({
        top: ARROW_CPY - (0.7 * a - MIN_A) * ARROW_HEIGHT_FACTOR,
        left: SEGMENT_WIDTH * (a + 1) / 2 + LEFT_A,
        border: '3px solid black'
    });
}

function prepareInputB(b, a) {
    const $input = $('.b');

    $input.removeAttr('disabled');
    $input.css({
        top: ARROW_CPY - (0.8 * b - MIN_B ) * ARROW_HEIGHT_FACTOR,
        left: SEGMENT_WIDTH * ((a + 1) + (b + 1) / 2) - LEFT_B,
        border: '3px solid black'
    });
}

function generateTerms() {
    const a = _.random(MIN_A, MAX_A);
    const ab = _.random(MIN_AB, MAX_AB);
    const b = ab - a;
    return { a, b, ab }
}

function drawArrow(x1, cpx, cpy, x2) {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = "#cb101e";



    ctx.beginPath();
    ctx.moveTo(SEGMENT_WIDTH * x1, SCALE_TOP);
    ctx.quadraticCurveTo(SEGMENT_WIDTH * cpx, ARROW_CPY - cpy * ARROW_HEIGHT_FACTOR, SEGMENT_WIDTH * x2, SCALE_TOP);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(SEGMENT_WIDTH * x2, SCALE_TOP);
    ctx.lineTo(SEGMENT_WIDTH * x2 - 10, SCALE_TOP - 20);
    ctx.moveTo(SEGMENT_WIDTH * x2, SCALE_TOP);
    ctx.lineTo(SEGMENT_WIDTH * x2 - 20, SCALE_TOP - 5);
    ctx.stroke();
}

document.addEventListener('DOMContentLoaded', init);
