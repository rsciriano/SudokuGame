using Golden.Man.Sudoku.Solver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TrueMagic.SudokuGenerator;

namespace SudokuGame.Web.Api
{
    /// <summary>
    /// Controlador API de Sudokus
    /// </summary>
    public class SudokusController : ApiController
    {
        /// <summary>
        /// Genera un nuevo Sudoku
        /// </summary>
        /// <returns>Array multidimensional 9x9 con los valores del Suduku</returns>
        /// <remarks>Los elementos sin establecer tendrán valor 0</remarks>
        [HttpGet, Route("api/sudokus/new")]
        public byte[,] New()
        {
            var g = new Generator();
            var s = g.Generate(3, Level.Easy);
            byte[,] grid = new byte[s.BoardSize, s.BoardSize];

            for (int i = 0; i < s.BoardSize; i++)
            {
                for (int j = 0; j < s.BoardSize; j++)
                {
                    grid[i, j] = s.GetValue(i, j);
                }
            }

            return grid;
        }

        /// <summary>
        /// Comprueba si los valores del sudoku proporcionado son válidos
        /// </summary>
        /// <param name="sudoku">Matriz multidimensional (9x9) con los valores del Sudoku a comprobar</param>
        /// <returns>Valor booleano que indica si el sudoku es válido</returns>
        [Route("api/sudokus/validate")]
        public bool Validate(byte[,] sudoku)
        {
            int[,] grid = new int[sudoku.GetLength(0), sudoku.GetLength(1)];

            for (int i = 0; i < sudoku.GetLength(0); i++)
            {
                for (int j = 0; j < sudoku.GetLength(1); j++)
                {
                    grid[i, j] = sudoku[i, j];
                }
            }

            return SudokuSolver.IsValidSudokuGame(grid);
        }

    }
}
