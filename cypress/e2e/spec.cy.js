describe('E2Eテスト', () => {
  it('ゲームがクリアでき、その後タイトルに戻ることができる', () => {
    cy.visit('http://localhost:3000');
    
    cy.contains('プレイする').click();

    for (let i = 0; i < 10; i++) {
      cy.get('[data-testid="character"]').invoke('text').then((key) => {
        cy.get('body').trigger('keydown', { key });
      });
    }

    cy.contains('タイトルに戻る').click();
  });

  it('プレイ画面からタイトル画面に遷移する', () => {
    cy.visit('http://localhost:3000');
    
    cy.contains('プレイする').click();

    cy.contains('タイトルに戻る').click();
  });
});
