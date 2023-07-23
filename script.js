const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		const { type, attributeName, target } = mutation;
		if (!['attributes', 'attributeFilter'].includes(type) || attributeName !== 'class') return;

		if (target.classList.contains('show')) {
			top.interval = setInterval(createBubble, 1000);
			return;
		}

		clearInterval(top.interval);
	});
});

const loading = document.querySelector('.loading');
observer.observe(loading, { attributes: true, attributeFilter: ['class'] });

function createBubble() {
	const loading = document.querySelector('.loading');
	const { width } = loading.getBoundingClientRect();

	const bubbleLeft = Math.floor(Math.random() * (width - 1)) + 1;
	const bubbleBlur = Math.floor(Math.random() * 10) + 2;
	const bubbleWidth = Math.floor(Math.random() * 15) + 5;

	const bubble = document.createElement('span');
	bubble.classList.add('bubble');
	bubble.style.left = bubbleLeft + 'px';
	bubble.style.filter = `blur(${bubbleBlur}px)`;
	bubble.style.width = bubbleWidth + 'px';

	loading.appendChild(bubble);

	const duration = getComputedStyle(bubble).animationDuration;
	const durationInSecondsRegex = new RegExp(/^\d+s$/);
	let durationToMilliseconds = duration.replaceAll(/\D/g, '');
	if (durationInSecondsRegex.test(duration)) {
		durationToMilliseconds = durationToMilliseconds * 1000;
	}

	setTimeout(() => {
		bubble.remove();
	}, durationToMilliseconds);
}

top.interval = setInterval(createBubble, 500);
