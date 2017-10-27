using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace c_sharp_playground
{
	class Program
	{
		static void Main(string[] args)
		{
			string clip = "00:00:12";

			TimeSpan ts = new TimeSpan(0,67, 12);
			Console.WriteLine("TimeSpan is {0}, {1}", ts.Duration().ToString(), ts.TotalSeconds.ToString());

			Console.ReadKey(true);
			return;
		}
	}
}
