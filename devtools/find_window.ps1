Add-Type -TypeDefinition 'using System;using System.Runtime.InteropServices;public class W{[DllImport("user32.dll")]public static extern bool GetWindowRect(IntPtr h,out RECT r);public struct RECT{public int Left,Top,Right,Bottom;}}';
$p = Get-Process java -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1
if ($p) {
    $r = New-Object W+RECT
    [W]::GetWindowRect($p.MainWindowHandle, [ref]$r) | Out-Null
    Write-Output ("RECT " + $r.Left + " " + $r.Top + " " + $r.Right + " " + $r.Bottom + " | TITLE=" + $p.MainWindowTitle)
} else {
    Write-Output "NO WINDOW"
}
