using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyGuidApp
{
	class Program
	{
		static void Main(string[] args)
		{
			List<string> _tmp = new List<string>();

			for (int i = 0; i < 10; i++)
			{
				_tmp.Add(Guid.NewGuid().ToString());
			}

			StreamWriter fs = File.CreateText("my-guids.txt");

			foreach (string s in _tmp)
			{
				Console.WriteLine("{0}", s);
				fs.WriteLine(s);
			}

			fs.Flush();
			fs.Close();

			Console.ReadLine();
		}
	}
}
