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
const TOP_A = 0.7;
const TOP_B = 0.8;
const state = {};

function init() {
    const { a, b, ab } = generateTerms();
    state.a = a;
    state.b = b;
    state.ab = ab;
    $('#term-a').text(a);
    $('#term-b').text(b);

    prepareA();
}

function prepareA() {
    const $input = $('.term-a-input');
    $input.focus();
    drawArrow(1, (state.a + 1) / 2, state.a - MIN_A, state.a + 1);
    prepareInputA();

    $input.on('keyup', onChangeA);
}

function prepareB() {
    const $input = $('.term-b-input');
    $input.focus();
    drawArrow(state.a + 1, state.a + 1 + state.b / 2, state.b - MIN_B, state.a + state.b + 1);
    prepareInputB();

    $input.on('keyup', onChangeB);
}

function prepareInputA() {
    const $input = $('.term-a-input');
    $input.css({
        top: ARROW_CPY - (TOP_A * state.a - MIN_A) * ARROW_HEIGHT_FACTOR,
        left: SEGMENT_WIDTH * (state.a + 1) / 2 + LEFT_A
    });
}

function prepareInputB() {
    const $input = $('.term-b-input');
    $input.css({
        top: ARROW_CPY - (TOP_B * state.b - MIN_B ) * ARROW_HEIGHT_FACTOR,
        left: SEGMENT_WIDTH * ((state.a + 1) + (state.b + 1) / 2) - LEFT_B
    });
}

function prepareInputSumm() {
    const $summ = $('.summ');
    $summ.removeClass('hidden');
    $summ.removeAttr('disabled');
    $summ.focus();

    $summ.on('keyup', onChangeSumm);
}

function onChangeA() {
    const $input = $('.term-a-input');
    $('#aContainer').removeClass('wrong-answer');

    if (state.a === Number($input.val())) {
        $input.css({ color: 'green', border: 'none'});
        $input.prop('disabled', true);
        prepareB();
        $input.off('keyup');

    } else {
        $input.addClass('wrong-introduced-answer');
        $('#aContainer').addClass('wrong-answer');
    }
}

function onChangeB() {
    const $input = $('.term-b-input');
    $('#bContainer').removeClass('wrong-answer');

    if (state.b === Number($input.val())) {
        $input.css({ color: 'green', border: 'none' });
        $input.prop('disabled', true);
        prepareInputSumm();
        $input.off('keyup');
    } else {
        $input.addClass('wrong-introduced-answer');
        $('#bContainer').addClass('wrong-answer')
    }
}


function onChangeSumm() {
    const $summ = $('.summ');
    $summ.removeClass('wrong-introduced-answer');

    if (state.ab === Number($summ.val())) {
        $summ.css({ color: 'green', border: 'none' });
        $summ.prop('disabled', true);
        $summ.blur();

        // Можно сразу генерировать следующую задачу.
        // location.reload();
        // $summ.addClass('hidden');
    } else {
        $summ.addClass('wrong-introduced-answer');
    }
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

$(init);
