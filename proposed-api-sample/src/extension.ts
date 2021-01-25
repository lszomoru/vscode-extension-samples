import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "proposed-api-sample" is now active!');

	/**
	 * You can use proposed API here. `vscode.` should start auto complete
	 * Proposed API as defined in vscode.proposed.d.ts.
	 */

	const command1 = vscode.commands.registerCommand('extension.getWorkspaceTrustState', () => {
		const trustState = vscode.workspace.trustState;
		vscode.window.showInformationMessage(`Workspace trust state: ${trustState}`);
	});

	const command2 = vscode.commands.registerCommand('extension.requireWorkspaceTrust', async () => {
		const trustState = await vscode.workspace.requireWorkspaceTrust('In order to complete this action you must trust the contents of this workpace');
		vscode.window.showInformationMessage(`Workspace trust state: ${trustState}`);
	});

	vscode.workspace.onDidChangeWorkspaceTrustState(state => {
		vscode.window.showInformationMessage(`Workspace trust state changed. Previous state: ${state.previousTrustState}, current state: ${state.currentTrustState}`);
	});

	context.subscriptions.push(...[command1, command2]);
}
