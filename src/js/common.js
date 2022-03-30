export function openConfirmBox(message, afterConfirm, afterCancel){
	ElMessageBox.confirm(
		message,
		'警告',
		{
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			type: 'warning',
		}
	)
	.then(afterConfirm)
	.catch(afterCancel)
}