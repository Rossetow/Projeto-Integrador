/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package br.com.senac.projetointegrador;

import com.formdev.flatlaf.intellijthemes.FlatDarkPurpleIJTheme;
import javax.swing.JFrame;

/**
 *
 * @author Aluno TDS
 */
public class ProjetoIntegrador {

    public static void main(String[] args) {
        FlatDarkPurpleIJTheme.setup(); // Dark Purple
        JFrame ex = new MainFrame();
        ex.setVisible(true);
    }
}
