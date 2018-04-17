const MIN_A = 6;
const MAX_A = 9;
const MIN_AB = 11;
const MAX_AB = 14;
const MIN_B = MIN_AB - MIN_A;
const SEGMENT_WIDTH = 38.5;
const SCALE_TOP = 75;
const ARROW_CPY = -40;
const ARROW_HEIGHT_FACTOR = 10;
const state = {};

function init() {

    const { a, b, ab } = generateTerms();
    state.a = a;
    state.b = b;
    state.ab = ab;
    $('#a').text(a);
    $('#b').text(b);

    drawArrows(
        SEGMENT_WIDTH,
        SCALE_TOP,
        SEGMENT_WIDTH * (a + 1) / 2,
        ARROW_CPY - (a - MIN_A) * ARROW_HEIGHT_FACTOR,
        SEGMENT_WIDTH * (a + 1),
        SCALE_TOP
    );

    prepareInput(a, '.a');
}

function prepareInput(term, selector, isSecondTerm = false) {
    if (!isSecondTerm) {
        $(selector).css({
            top: ARROW_CPY - (term - MIN_A) * ARROW_HEIGHT_FACTOR,
            left: SEGMENT_WIDTH * (term + 1) / 2,
            border: '3px solid black'
        });
        state.firstTermCoord = term;
    } else {
        $(selector).css({
            top: ARROW_CPY - (term - MIN_B) * ARROW_HEIGHT_FACTOR,
            left: SEGMENT_WIDTH * ((state.firstTermCoord + 1) + term / 2),
            border: '3px solid black'
        });
    }


    $(selector).on('change', () => {
        if (isSecondTerm) {
            checkAnswer(term, selector, true);
        } else {
            checkAnswer(term, selector);
        }
    });
}

function checkAnswer(term, selector, isSecondTerm = false) {

    if (term === Number($(selector).val())) {
        $(selector).css({
            color: 'green',
            border: 'none',
            disabled: "disabled"
        });

        if (!isSecondTerm) {
            $('#aContainer').removeClass('wrong-answer');
            drawArrows(
                SEGMENT_WIDTH * (term + 1),
                SCALE_TOP,
                SEGMENT_WIDTH * ((term + 1) + state.b / 2),
                ARROW_CPY - (state.b - MIN_B) * ARROW_HEIGHT_FACTOR,
                SEGMENT_WIDTH * (term + state.b + 1),
                SCALE_TOP
            );

            prepareInput(state.b, '.b', true);
            $('.b').removeAttr('disabled');
            $(selector).off('change');

        } else {
            $('#bContainer').removeClass('wrong-answer');
            const selector = '.summ';
            $(selector).removeAttr('disabled');
            $(selector).css({
                value: '',
                border: '3px solid black' });
            // $(selector).text('');

            $(selector).on('change', () => {
                if (state.ab === Number($(selector).val())) {
                    $(selector).removeClass('wrong-answer');
                    $(selector).css({ color: 'green', border: 'none'});
                    alert('Well done!');
                } else {
                    $('.summ').addClass('wrong-answer');
                }
            });
        }
    } else {
        $(selector).css({
            color: 'red'
        });
        if (!isSecondTerm) {
            $('#aContainer').addClass('wrong-answer')
        } else {
            $('#bContainer').addClass('wrong-answer')
        }
    }
}

function generateTerms() {
    const a = _.random(MIN_A, MAX_A);
    const ab = _.random(MIN_AB, MAX_AB);
    const b = ab - a;
    return { a, b, ab }
}

function drawArrows(x1, y1, cpx, cpy, x2, y2) {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cpx, cpy, x2, y2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x2,y2);
    ctx.lineTo(x2 - 15,y2 - 20);
    ctx.moveTo(x2,y2);
    ctx.lineTo(x2 - 20,y2 - 5);
    ctx.stroke();
}

document.addEventListener('DOMContentLoaded', init);






