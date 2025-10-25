import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type UserRole = 'student' | 'teacher' | 'admin' | null;

interface User {
  id: string;
  name: string;
  role: UserRole;
  login: string;
}

interface Subject {
  id: string;
  name: string;
  teacher: string;
  grade: number | null;
  attendance: number;
  absences: { type: 'Н' | 'У'; date: string }[];
}

interface ScheduleItem {
  id: string;
  time: string;
  subject: string;
  type: 'Лекция' | 'Практика';
  groups?: string[];
  room: string;
  day: string;
}

const mockStudentData: Subject[] = [
  { id: '1', name: 'Математика', teacher: 'Иванов И.И.', grade: 4.5, attendance: 85, absences: [{ type: 'Н', date: '15.10' }, { type: 'У', date: '20.10' }] },
  { id: '2', name: 'Программирование', teacher: 'Петров П.П.', grade: 5.0, attendance: 95, absences: [] },
  { id: '3', name: 'Базы данных', teacher: 'Сидорова С.С.', grade: 4.0, attendance: 80, absences: [{ type: 'Н', date: '12.10' }] },
  { id: '4', name: 'Английский язык', teacher: 'Смирнова А.А.', grade: 4.2, attendance: 90, absences: [{ type: 'У', date: '18.10' }] },
];

const mockSchedule: ScheduleItem[] = [
  { id: '1', time: '9:00-10:30', subject: 'Математика', type: 'Лекция', groups: ['ИС-21', 'ИС-22', 'ИС-23'], room: 'Ауд. 301', day: 'Понедельник' },
  { id: '2', time: '11:00-12:30', subject: 'Программирование', type: 'Практика', groups: ['ИС-21'], room: 'Комп. класс 2', day: 'Понедельник' },
  { id: '3', time: '13:00-14:30', subject: 'Базы данных', type: 'Лекция', groups: ['ИС-21', 'ИС-22'], room: 'Ауд. 205', day: 'Вторник' },
];

const mockStudents = [
  { id: '1', name: 'Алексеев Алексей Алексеевич', group: 'ИС-21', attendance: '' },
  { id: '2', name: 'Борисов Борис Борисович', group: 'ИС-21', attendance: '' },
  { id: '3', name: 'Васильева Вера Викторовна', group: 'ИС-21', attendance: '' },
  { id: '4', name: 'Григорьев Григорий Григорьевич', group: 'ИС-22', attendance: '' },
  { id: '5', name: 'Дмитриева Дарья Дмитриевна', group: 'ИС-22', attendance: '' },
];

export default function Index() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<ScheduleItem | null>(null);
  const [students, setStudents] = useState(mockStudents);

  const handleLogin = () => {
    if (login === 'student' && password === '123') {
      setCurrentUser({ id: '1', name: 'Иванов Иван Иванович', role: 'student', login: 'student' });
    } else if (login === 'teacher' && password === '123') {
      setCurrentUser({ id: '2', name: 'Петров Петр Петрович', role: 'teacher', login: 'teacher' });
    } else if (login === 'admin' && password === '123') {
      setCurrentUser({ id: '3', name: 'Администратор', role: 'admin', login: 'admin' });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLogin('');
    setPassword('');
  };

  const handleAttendanceMark = (studentId: string, mark: 'Н' | 'присутствует') => {
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, attendance: mark } : s
    ));
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                <Icon name="GraduationCap" size={32} className="text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center font-bold">Образовательная платформа</CardTitle>
            <p className="text-center text-muted-foreground">Вход в систему</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login">Логин</Label>
                <Input
                  id="login"
                  placeholder="Введите логин"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleLogin}>
                Войти
              </Button>
              <div className="text-sm text-muted-foreground text-center space-y-1">
                <p>Демо доступы:</p>
                <p>student/123 | teacher/123 | admin/123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-sidebar text-sidebar-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <Icon name="GraduationCap" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Образовательная платформа</h1>
              <p className="text-sm text-sidebar-foreground/80">{currentUser.name}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="bg-white text-sidebar hover:bg-gray-100">
            <Icon name="LogOut" size={18} className="mr-2" />
            Выйти
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentUser.role === 'student' && (
          <Tabs defaultValue="subjects" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="subjects">
                <Icon name="BookOpen" size={18} className="mr-2" />
                Дисциплины
              </TabsTrigger>
              <TabsTrigger value="schedule">
                <Icon name="Calendar" size={18} className="mr-2" />
                Расписание
              </TabsTrigger>
              <TabsTrigger value="grades">
                <Icon name="BarChart3" size={18} className="mr-2" />
                Успеваемость
              </TabsTrigger>
              <TabsTrigger value="record">
                <Icon name="FileText" size={18} className="mr-2" />
                Зачётная книжка
              </TabsTrigger>
            </TabsList>

            <TabsContent value="subjects" className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Мои дисциплины</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {mockStudentData.map((subject) => (
                  <Card key={subject.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{subject.name}</span>
                        {subject.grade && (
                          <Badge className="bg-primary text-white">{subject.grade.toFixed(1)}</Badge>
                        )}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{subject.teacher}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Посещаемость:</span>
                          <span className="font-semibold">{subject.attendance}%</span>
                        </div>
                        {subject.absences.length > 0 && (
                          <div className="flex gap-2 flex-wrap">
                            <span className="text-sm text-muted-foreground">Пропуски:</span>
                            {subject.absences.map((abs, idx) => (
                              <Badge
                                key={idx}
                                variant={abs.type === 'Н' ? 'destructive' : 'secondary'}
                              >
                                {abs.type} ({abs.date})
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Расписание занятий</h2>
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>День</TableHead>
                        <TableHead>Время</TableHead>
                        <TableHead>Дисциплина</TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Аудитория</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockSchedule.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.day}</TableCell>
                          <TableCell>{item.time}</TableCell>
                          <TableCell>{item.subject}</TableCell>
                          <TableCell>
                            <Badge variant={item.type === 'Лекция' ? 'default' : 'secondary'}>
                              {item.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.room}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="grades" className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Успеваемость</h2>
              <div className="grid gap-4">
                {mockStudentData.map((subject) => (
                  <Card key={subject.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Средний балл</span>
                            <span className="font-bold text-primary">{subject.grade?.toFixed(1)}</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${((subject.grade || 0) / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Посещаемость</span>
                            <span className="font-bold text-primary">{subject.attendance}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${subject.attendance}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="record" className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Зачётная книжка</h2>
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Дисциплина</TableHead>
                        <TableHead>Преподаватель</TableHead>
                        <TableHead>Семестр</TableHead>
                        <TableHead>Результат</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockStudentData.map((subject) => (
                        <TableRow key={subject.id}>
                          <TableCell className="font-medium">{subject.name}</TableCell>
                          <TableCell>{subject.teacher}</TableCell>
                          <TableCell>1 семестр 2024/25</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500 text-white">Зачёт</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {currentUser.role === 'teacher' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Расписание преподавателя</h2>
            </div>
            <div className="grid gap-4">
              {mockSchedule.map((lesson) => (
                <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <Icon name="Clock" size={20} className="text-primary" />
                          <span className="font-semibold">{lesson.day}, {lesson.time}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Icon name="BookOpen" size={20} className="text-primary" />
                          <span className="text-lg font-bold">{lesson.subject}</span>
                          <Badge>{lesson.type}</Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <Icon name="Users" size={20} className="text-primary" />
                          <span className="text-sm text-muted-foreground">
                            Группы: {lesson.groups?.join(', ')}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Icon name="MapPin" size={20} className="text-primary" />
                          <span className="text-sm text-muted-foreground">{lesson.room}</span>
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button onClick={() => setSelectedLesson(lesson)}>
                            <Icon name="ClipboardList" size={18} className="mr-2" />
                            Открыть журнал
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>
                              {lesson.subject} - {lesson.type}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="text-sm text-muted-foreground">
                              Группы: {lesson.groups?.join(', ')}
                            </div>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>№</TableHead>
                                  <TableHead>ФИО студента</TableHead>
                                  <TableHead>Группа</TableHead>
                                  <TableHead>Посещаемость</TableHead>
                                  <TableHead>Оценка</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {students.map((student, idx) => (
                                  <TableRow key={student.id}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell className="font-medium">{student.name}</TableCell>
                                    <TableCell>{student.group}</TableCell>
                                    <TableCell>
                                      <Select onValueChange={(value) => handleAttendanceMark(student.id, value as 'Н' | 'присутствует')}>
                                        <SelectTrigger className="w-32">
                                          <SelectValue placeholder="Отметить" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="присутствует">Присутствует</SelectItem>
                                          <SelectItem value="Н">Н (пропуск)</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </TableCell>
                                    <TableCell>
                                      <Input type="number" min="2" max="5" placeholder="2-5" className="w-20" />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline">Отмена</Button>
                              <Button>Сохранить</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentUser.role === 'admin' && (
          <Tabs defaultValue="students" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="students">
                <Icon name="Users" size={18} className="mr-2" />
                Студенты
              </TabsTrigger>
              <TabsTrigger value="teachers">
                <Icon name="UserCheck" size={18} className="mr-2" />
                Преподаватели
              </TabsTrigger>
              <TabsTrigger value="schedule">
                <Icon name="Calendar" size={18} className="mr-2" />
                Расписание
              </TabsTrigger>
              <TabsTrigger value="grades">
                <Icon name="FileEdit" size={18} className="mr-2" />
                Успеваемость
              </TabsTrigger>
            </TabsList>

            <TabsContent value="students" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Управление студентами</h2>
                <Button>
                  <Icon name="UserPlus" size={18} className="mr-2" />
                  Добавить студента
                </Button>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <Label>Группа</Label>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-64">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все группы</SelectItem>
                        <SelectItem value="is-21">ИС-21</SelectItem>
                        <SelectItem value="is-22">ИС-22</SelectItem>
                        <SelectItem value="is-23">ИС-23</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ФИО</TableHead>
                        <TableHead>Группа</TableHead>
                        <TableHead>Логин</TableHead>
                        <TableHead>Успеваемость</TableHead>
                        <TableHead>Посещаемость</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.group}</TableCell>
                          <TableCell className="text-muted-foreground">student{student.id}</TableCell>
                          <TableCell>
                            <Badge className="bg-primary text-white">4.5</Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">85%</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Icon name="Edit" size={16} />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="teachers" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Управление преподавателями</h2>
                <Button>
                  <Icon name="UserPlus" size={18} className="mr-2" />
                  Добавить преподавателя
                </Button>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ФИО</TableHead>
                        <TableHead>Дисциплины</TableHead>
                        <TableHead>Логин</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Иванов Иван Иванович</TableCell>
                        <TableCell>Математика, Алгебра</TableCell>
                        <TableCell className="text-muted-foreground">ivanov</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Icon name="Edit" size={16} />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Управление расписанием</h2>
                <Button>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить занятие
                </Button>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>День</TableHead>
                        <TableHead>Время</TableHead>
                        <TableHead>Дисциплина</TableHead>
                        <TableHead>Преподаватель</TableHead>
                        <TableHead>Группы</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockSchedule.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.day}</TableCell>
                          <TableCell>{item.time}</TableCell>
                          <TableCell className="font-medium">{item.subject}</TableCell>
                          <TableCell>Иванов И.И.</TableCell>
                          <TableCell className="text-sm">{item.groups?.join(', ')}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Icon name="Edit" size={16} />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="grades" className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Корректировка успеваемости</h2>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Группа</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите группу" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="is-21">ИС-21</SelectItem>
                          <SelectItem value="is-22">ИС-22</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Студент</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите студента" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Алексеев А.А.</SelectItem>
                          <SelectItem value="2">Борисов Б.Б.</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Администрация может исправлять оценки и изменять Н на У
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}
