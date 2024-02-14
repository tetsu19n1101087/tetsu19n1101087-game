describe('E2Eテスト', () => {
  it('ゲームがクリアでき、その後タイトルに戻ることができる', () => {
    cy.visit('http://localhost:3000');

    cy.contains('数字・記号専用のタイピング練習ゲーム').should('exist');
    
    cy.contains('プレイする').click();

    for (let i = 0; i < 10; i++) {
      cy.get('[data-testid="character"]').invoke('text').then((key) => {
        cy.get('body').trigger('keydown', { key });
      });
    }

    cy.contains('結果').should('exist');
    cy.get('th').should('have.length', 5);
    cy.get('td').should('have.length', 5);

    cy.contains('タイトルに戻る').click();
    cy.contains('数字・記号専用のタイピング練習ゲーム').should('exist');
  });

  it('プレイ画面からタイトル画面に遷移する', () => {
    cy.visit('http://localhost:3000');
    
    cy.contains('プレイする').click();
    cy.contains('表示された数字または記号のキーを押してください').should('exist');

    cy.contains('タイトルに戻る').click();
    cy.contains('数字・記号専用のタイピング練習ゲーム').should('exist');
  });

  it('正解のキーを押すと正解数のカウントが増える', () => {
    cy.visit('http://localhost:3000');

    cy.contains('プレイする').click();

    cy.contains(/正解数:/).should('have.text', '正解数: 0');

    cy.get('[data-testid="character"]').invoke('text').then((key) => {
      cy.get('body').trigger('keydown', { key });
    });

    cy.contains(/正解数:/).should('have.text', '正解数: 1');
  });
});
