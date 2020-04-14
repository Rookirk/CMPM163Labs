function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);

	models.Clarke.rotation.y += .01;
}